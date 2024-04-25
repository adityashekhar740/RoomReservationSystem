const mongoose=require('mongoose');

const reservationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    checkIn:{
         type:Date,
        required:true,
    },
    checkOut:{
    type:Date,
        required:true,
    },
    guests:{
         type:Number,
        required:true,
    },
    roomType:{
         type:String,
        required:true,
    },
    phone:{
         type:Number,
        required:true,
    },
    address:{
         type:String,
        required:true,
    },
    email:{
         type:String,
        required:true,
    },
    message:{
         type:String,
        required:true,
    },
    amenities:{
        type:Array,
        required:true,
        default:[],
    },
    roomId:{
         type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const reservation=mongoose.model('revervation',reservationSchema);

module.exports=reservation;
