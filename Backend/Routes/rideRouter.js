const express = require('express');
const rideRouter = express.Router();
const {body}=require('express-validator')
const rideController=require('../controller/rideController');
const authMiddleware=require('../middlewares/auth.middleware')

rideRouter.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicleType'),
  rideController.createRide
)





module.exports = rideRouter;