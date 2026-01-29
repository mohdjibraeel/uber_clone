//External Modules
const dotenv= require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectToDB=require('./db/db');

//Local Modules
const userRouter=require('./Routes/userRouter');

connectToDB();

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res,next)=>{
  console.log('Hello from Uber');
  res.send('Hello from Uber');
})

app.use('/users',userRouter);    




module.exports=app;