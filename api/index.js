const express=require('express');
const app=express();
const cors=require('cors');
const mongoose =require('mongoose');
const AuthRouter=require('./routes/AuthRoutes');
const ReservationRoutes=require("./routes/ReservationRoutes");
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
dotenv.config();
mongoose.connect(`${process.env.MONGO}`).then(()=>{
    console.log('Database connected');
})
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth',AuthRouter);
app.use('/api/reservations',ReservationRoutes);





app.listen(3000,()=>{
    console.log('server running on port 3000');
})