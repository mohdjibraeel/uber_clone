const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const BlackListToken=require('../models/blackListToken');
const Captain = require('../models/captain');


exports.authUser=async(req,res,next)=>{
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
  if(!token){
    return res.status(401).json({message:' Access Denied,Unauthorized person'});
  }

  const isBlacklisted = await BlackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    return next();
  }catch(err){
    if(err instanceof jwt.JsonWebTokenError){
      return res.status(401).json({message:'Invalid token'});
    }
    next(err);
  }
};

exports.  authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied, Unauthorized person' });
  }

  const isBlacklisted = await BlackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await Captain.findById(decoded._id);
    return next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next(err);
  }
};