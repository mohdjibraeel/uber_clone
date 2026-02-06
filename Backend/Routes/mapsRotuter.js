const express =require('express');
const { authUser } = require('../middlewares/auth.middleware');
const authMiddleware=require("../middlewares/auth.middleware");
const mapsController=require('../controller/mapsController');
const {query}=require('express-validator');

const mapsRouter =express.Router();


mapsRouter.get('/get-coordinates',query('address').isString().isLength({min:3}),authMiddleware.authUser,mapsController.getCoordinates);

mapsRouter.get('/get-distance-time',query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),authMiddleware.authUser,mapsController.getDistanceTime)

mapsRouter.get('/get-suggations',query('input').isString().isLength({min:3}),authMiddleware.authUser,mapsController.getAutoSuggestions)


module.exports =mapsRouter;