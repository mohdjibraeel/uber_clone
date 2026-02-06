//External Modules
const dotenv= require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectToDB=require('./db/db');
const cookieParser=require('cookie-parser');

//Local Modules
const userRouter=require('./Routes/userRouter');
const captainRouter=require('./Routes/captainRouter');
const mapsRouter=require('./Routes/mapsRotuter');
const rideRouter = require('./Routes/rideRouter');

connectToDB();

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res,next)=>{
  console.log('Hello from Uber');
  res.send('Hello from Uber');
})

app.use('/users',userRouter);    
app.use('/captains',captainRouter);
app.use('/maps',mapsRouter);
app.use('/rides',rideRouter);




module.exports=app;