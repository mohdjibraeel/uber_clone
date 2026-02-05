const express =require('express');
const { authUser } = require('../middlewares/auth.middleware');
const authMiddleware=require("../middlewares/auth.middleware");
const mapsController=require('../controller/mapsController');
const {query}=require('express-validator');

const mapsRouter =express.Router();


mapsRouter.get('/get-coordinates',query('address').isString().isLength({min:3}),authMiddleware.authUser,mapsController.getCoordinates);




module.exports =mapsRouter;