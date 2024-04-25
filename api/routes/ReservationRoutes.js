const express=require('express');
router=express.Router();
const VerifyToken = require('../utils/VerifyToken');
const {CheckAvail,Booking,GetBookings,GetRoomDetails,UpdateBooking,DeleteBooking}=require("../controllers/Reservation.Controllers");

router.post('/checkAvail',CheckAvail);
router.post('/booking/:id',VerifyToken,Booking);
router.get('/getBookings/:id',VerifyToken,GetBookings);
router.get('/getRoomDetails/:id',VerifyToken,GetRoomDetails);
router.post('/updateBooking/:id',VerifyToken,UpdateBooking);
router.delete('/deleteBooking/:id',VerifyToken,DeleteBooking);

module.exports=router;