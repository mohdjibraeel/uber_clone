const User = require("../models/user");

exports.createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = new User({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user; 
};
