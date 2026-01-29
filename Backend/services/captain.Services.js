const Captain = require("../models/captain");

exports.createCaptain = async ({ firstname, lastname, email, password, vehicleDetails }) => {
  if (!firstname || !email || !password || !color ||!plate ||!capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  const captain =Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle:{
      color,
      plate,
      capacity,
      vehicleType
    }
  });
  return captain;
};
