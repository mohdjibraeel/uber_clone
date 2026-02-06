const mapsServices = require("../services/maps.services");
const { validationResult } = require("express-validator");

exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapsServices.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Coordinate not found" }, { error: error });
  }
};

exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {origin,destination}=req.query;
    const distanceTime=await mapsServices.getDistanceTime(origin,destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAutoSuggestions=async(req,res,next)=>{
  try{
      const error=validationResult(req);
      if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
      }
      const {input}=req.query;
      const suggestions=await mapsServices.getAutoSuggestions(input);
      res.status(200).json(suggestions);
  }catch(err){
    res.status(500).json({message:'Internal server error'})
  }
}
