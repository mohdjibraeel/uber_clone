const Captain = require("../models/captain");
const captainService = require("../services/captain.Services");
const { validationResult } = require("express-validator");

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
