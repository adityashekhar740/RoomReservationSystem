const express=require('express');
router=express.Router();
const {CheckAvail,Booking}=require("../controllers/Reservation.Controllers");
router.post('/checkAvail',CheckAvail);
router.post('/booking/:id',Booking);


module.exports=router;