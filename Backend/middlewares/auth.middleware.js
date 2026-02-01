const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlackListToken = require("../models/blackListToken");
const Captain = require("../models/captain");

exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: " Access Denied,Unauthorized person" });
  }

  const isBlacklisted = await BlackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }else{
      req.user=user;
      return next();
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(err);
  }
};

exports.authCaptain = async (req, res, next) => {
  console.log("Authorization Header:", req.header.Authorization);
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied, Unauthorized person" });
  }

  const isBlacklisted = await BlackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    } else {
      req.captain = captain;
      return next();
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(err);
  }
};
