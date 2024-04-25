const Rooms = require("../models/RoomsModel");
const Reserve = require("../models/ReservationModel");
const CheckAvail = async (req, res) => {
  const { roomType } = req.body;
  try {
    let result = await Rooms.findOne({
      type: roomType,
    });
    if (result.userRef.length > 3) {
      return res.status(500).json(`Currently ${roomType}  is fully booked`);
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json("");
  }
};
const Booking = async (req, res) => {
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
    userId
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
  });
  res.status(200).json(reservation);
  }
  catch(e){
    res.status(500).json(e);
  }

};

module.exports = { CheckAvail, Booking };
