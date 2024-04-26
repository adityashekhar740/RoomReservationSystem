const Rooms = require("../models/RoomsModel");
const Reserve = require("../models/ReservationModel");
const CheckAvail = async (req, res) => {
  const { roomType } = req.body;
  try {
    let result = await Rooms.findOne({
      type: roomType,
    });
    if (result.userRef.length > 1) {
      return res.status(500).json(`Currently ${roomType}  is fully booked`);
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json("");
  }
};
const Booking = async (req, res) => {
  if(req.user.id!==req.params.id){
    return  res.status(403).json('YOU CAN ONLY BOOK FROM YOUR ACCOUNT');
  }
  const {
    name,
    checkIn,
    checkOut,
    guests,
    roomType,
    phone,
    address,
    email,
    message,
    amenities,
    roomId,
    userId,
    price,
  } = req.body;
  try{
    const reservation = await Reserve.create({
    name,
    checkIn,
    checkOut,
    guests,
    roomType,
    phone,
    address,
    email,
    message,
    amenities,
    roomId,
    userId,
    price,
  });
  if(reservation){
    const room=await Rooms.findByIdAndUpdate(roomId,
    {
      $push:{
        userRef:userId
      },
    },
    {new:true}
    );
  }
  res.status(200).json(reservation);
  }
  catch(e){
    res.status(500).json(e);
  }

};

const GetBookings=async(req,res)=>{
if(req.user.id!==req.params.id){
    return  res.status(403).json('YOU CAN ONLY SEE YOUR OWN  BOOKINGS');
  }
  try{
    const reservation=await Reserve.find({
      userId:req.params.id,
    });
    if(!reservation){
      return res.status(200).json({message:"No Reservations Found"});
    }
    res.status(200).json(reservation);
  }
  catch(e){
    res.status(500).json('UNABLE TO FIND YOUR RESERVATIONS');
  }
}

const GetRoomDetails=async(req,res)=>{
  
  try{
    const room=await Rooms.findById({_id:req.params.id});
    res.status(200).json(room);
  }
  catch(e){
    res.status(500).json('UNABLE TO FIND YOUR ROOM');
  }

}

const UpdateBooking=async(req,res)=>{
  const {amenities,email,address,phone,message}=req.body;
  try{
    const  updateReservation = await Reserve.findOneAndUpdate({_id:req.params.id},
    {
      $set:{
        amenities,
        email,
        address,
        phone,
        message,
      },
    },{new:true}
    )
    
    console.log(updateReservation);
    res.status(200).json(updateReservation);
  }
  catch(e){
    res.status(400).json('UNABLE TO UPDATE  THE BOOKING');
  }
}
const DeleteBooking=async(req,res)=>{
  try{
    const deletedBooking=await Reserve.findByIdAndDelete(req.params.id);
    if(!deletedBooking) return res.status(401).json("NOT ABLE TO DELETE YOUR BOOKING");
    res.status(200).json("BOOKING HAS BEEN CANCELLED SUCCESSFULLY");
  }
  catch(e){
    res.status(500).json('UNABLE TO DELETE YOUR BOOKING');
  }
}
module.exports = { CheckAvail, Booking ,GetBookings ,GetRoomDetails ,UpdateBooking,DeleteBooking};
