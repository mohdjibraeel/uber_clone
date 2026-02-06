const Ride =require('../models/ride');
const mapsServices=require('../services/maps.services');
const crypto =require('crypto');

async function getFare(pickup,destination){
  if(!pickup||!destination){
    throw new Error('PickUp and Destination require')
  }
  const distanceTime=await mapsServices.getDistanceTime(pickup,destination);

  const baseFare={
    auto:30,
    car:50,
    moto:20
  }
  const perKmRate={
    auto:10,
    car:15,
    moto:8
  }
  const perMinuteRate={
    auto:2,
    car:3,
    moto:1.5
  }
  const fare={
    auto:baseFare.auto+(distanceTime.distance.value)/1000*perKmRate.auto+(distanceTime.duration.value)/60*perMinuteRate.auto,
    car:baseFare.car+(distanceTime.distance.value)/1000*perKmRate.car+(distanceTime.duration.value)/60*perMinuteRate.car,
    moto:baseFare.moto+(distanceTime.distance.value)/1000*perKmRate.moto+(distanceTime.duration.value)/60*perMinuteRate.moto
  }
  return fare;
}

function getOtp(num){
  const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
  return otp;
}
exports.createRide=async ({user,pickup,destination,vehicleType})=>{
  if(!user||!pickup||!destination||!vehicleType){
    throw new Error('All fields are Require')
  }
  const fare =await getFare(pickup,destination);

  const ride=Ride.create({
    user,pickup,destination,fare:fare[vehicleType],otp:getOtp(6)
  })

  return ride;
}

