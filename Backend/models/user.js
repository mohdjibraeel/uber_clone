const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength:[3,'Firstname must be at least 3 characters long']
    },
    lastname: {
      type: String,
      minlength:[3,'Lastname must be at least 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String,
    required: true
  }
}); 

userSchema.methods.generateAuthToken=function(){
  const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET);
  return token;
}
userSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;