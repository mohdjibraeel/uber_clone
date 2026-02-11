const rideService = require("../services/ride.services");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.services");
const { sendMessageToSocketId } = require("../socket");
const Ride = require("../models/ride");

exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickUpCoordinates = await mapService.getAddressCoordinate(pickup);
    const captainsInRadius = await mapService.getCaptainsInRadius(
      pickUpCoordinates.ltd,
      pickUpCoordinates.lng,
      2,
    );
    ride.otp = "";
    const UserWithRide = await Ride.findOne({ _id: ride._id }).populate("user");
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: UserWithRide,
      });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getFare = async (req, res) => {
  const { pickup, destination } = req.query;
  const fare = await rideService.getFare(pickup, destination);
  return res.status(200).json({ fare: fare });
};

exports.acceptRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.acceptRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-accepted",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (err) {
    console.log("Error with Captain accepting the ride", err);
    return res.status(500).json({ message: err.message });
  }
};

exports.startRide = async (req, res) => {
  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {rideId,otp}=req.query;
  try{
    const ride=await rideService.startRide({rideId,otp,captain:req.captain});
    return res.status(200).json(ride);
  }catch(err){
    console.log("error while Starting the ride",err);
    return res.status(500).json({message:err.message})
  }
};
