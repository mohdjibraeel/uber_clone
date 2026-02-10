const Ride = require("../models/ride");
const mapService = require("../services/maps.services");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("PickUp and Destination require");
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };
  const fare = {
    auto: Math.floor(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto,
    ),
    car: Math.floor(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car,
    ),
    moto: Math.floor(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto,
    ),
  };
  return fare;
}

exports.getFare = getFare;
function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are Require");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const distance = Math.round(distanceTime.distance.value / 1000);
  const duration = distanceTime.duration.value / 60;
  const fare = await getFare(pickup, destination);

  const ride = Ride.create({
    user,
    pickup,
    destination,
    duration,
    distance,
    fare: fare[vehicleType],
    otp: getOtp(6),
  });

  return ride;
};

exports.acceptRide = async ({ rideId ,captain}) => {
  if (!rideId) {
    throw new Error("Ride id is Reqiured");
  }

  await Ride.findByIdAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain,
    },
  );
  const ride = await Ride.findOne({ _id: rideId }).populate("user").populate('captain').select('+otp');
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};
