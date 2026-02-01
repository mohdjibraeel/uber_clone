const User = require("../models/user");
const userService = require("../services/user.Services");
const { validationResult } = require("express-validator");
const BlackListToken = require("../models/blackListToken");

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashPassword = await User.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    socketId: null
  });
  const token = user.generateAuthToken();
  await user.save();
  res.status(201).json({ user, token });
};

exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ user, token });
};

exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user }); 
};

exports.logoutUser = async (req, res, next) => { 
  res.clearCookie("token");
  const token = req.cookies.token || req.header('Authorization').split(' ')[1];

  await BlackListToken.create({ token });
  res.status(200).json({ message: 'Logged out successfully' });
};
