const express=require('express');
const authRoutes =require('../backend/routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const cors=require('cors')
const app=express();
const mongoose=require('mongoose')
require('dotenv').config();
console.log(process.env.MONGODB_URI);



//middlewares
app.use(cors());
app.use(express.json());
const mongoUri= ''
mongoose.connect(mongoUri)
.then((data)=>console.log('mongodb connect'))
.catch((err)=>console.log('error occured'))


//routes
app.use('/api/auth', authRoutes); 
app.use('/api/food', foodRoutes);
 app.use('/api/order', orderRoutes);  



 //app.listen(5000,()=>{
  //  console.log('server running at http://localhost:5000');
 //})

 const PORT=process.env.PORT||5000;
 app.listen(PORT,()=>{
   console.log('server running at http://localhos:5000');
 })
