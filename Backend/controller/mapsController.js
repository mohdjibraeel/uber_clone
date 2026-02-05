const mapsServices= require('../services/maps.services');
const  {validationResult}=require('express-validator');

exports.getCoordinates=async (req,res,next)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {address}=req.query;

  try{
    const coordinates=await mapsServices.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  }catch(error){
    console.log(error);
    res.status(404).json({message:'Coordinate not found'},{error:error})
  }
}