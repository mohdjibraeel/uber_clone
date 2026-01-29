const express=require('express');
const captainRouter=express.Router();
const {body}=require('express-validator');
const captainController=require('../controller/captainController');


captainRouter.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
],captainController.registerCaptain);

module.exports=captainRouter;