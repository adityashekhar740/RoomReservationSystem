import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookingCard from '../components/BookingCard';
function Bookings() {
    const {currentUser}=useSelector((state)=>state.user);
    const [reservations, setreservations] = useState([]);
    useEffect(()=>{
        const fetch_data=async()=>{
            try{
            const res=await axios.get(`/api/reservations/getBookings/${currentUser._id}`);
            setreservations(res.data);
        }
        catch(e){
            console.log(e);
        }
        }
        fetch_data();
    },[])
  return (
    <div className=' p-2 md:p-5 w-full h-[100%]  bg-[#f1eaea] flex flex-col gap-10' >
    <h1 className='text-center text-3xl  ' >Your Bookings</h1>
    <div className=' w-[100%] md:w-[64%] mx-auto flex flex-col gap-4 ' >
    {
        reservations?
        reservations.length>0?
        reservations.map((res,index)=>(
            <BookingCard data={res} />
        ))
        :null
        :null
    }
    </div>

    </div>
  )
}

export default Bookings