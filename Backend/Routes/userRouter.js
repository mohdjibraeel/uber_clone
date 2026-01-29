const express=require('express');
const userRouter=express.Router();
const {body}=require('express-validator');
const userController=require('../controller/userController');

userRouter.post('/register',[
    body('fullname.firstname').notEmpty().isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userController.registerUser);





module.exports=userRouter;