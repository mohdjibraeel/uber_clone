const Captain = require("../models/captain");
const captainService = require("../services/captain.Services");
const { validationResult } = require("express-validator");
const blacklistToken=require('../models/blackListToken');

exports.registerCaptain = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainExists = await Captain.findOne({ email });
    if (isCaptainExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword = await Captain.hashPassword(password);
    const captain = await Captain.create({
      fullname,
      email,
      password: hashedPassword,
      vehicle,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password, captain.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ captain, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
    const captain = req.captain;
    res.status(200).json({ captain });
};

exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  await blacklistToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};