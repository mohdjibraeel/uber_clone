//External Modules
const dotenv= require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());


app.get('/',(req,res,next)=>{
  console.log('Hello from Uber');
  res.send('Hello from Uber');
})




module.exports=app;