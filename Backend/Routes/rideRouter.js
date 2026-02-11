const express = require('express');
const rideRouter = express.Router();
const {body,query}=require('express-validator')
const rideController=require('../controller/rideController');
const authMiddleware=require('../middlewares/auth.middleware')

rideRouter.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicleType'),
  rideController.createRide
)

rideRouter.get('/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({min:3}).withMessage('Invalid inputs'),
  query('pickup').isString().isLength({min:3}).withMessage('Invalid inputs'),
  rideController.getFare
)

rideRouter.post('/accept',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid Ride Id'),
  rideController.acceptRide
)

rideRouter.get('/start-ride',
  authMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('Invalid Ride Id'),
  query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid otp'),
  rideController.startRide
)




module.exports = rideRouter;