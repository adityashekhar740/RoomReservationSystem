import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import BookingModal from './BookingModal';
import axios from 'axios';
function BookingCard({data}) {
    const [openModal, setopenModal] = useState(false);
    const handleDelete=async()=>{
        const ans=prompt("type 'yes' to delete");
        try{
            if(ans=='yes'){
            const res=await axios.delete(`/api/reservations/deleteBooking/${data._id}`);
            window.location.reload();
            }
            else{
                return;
            }
        }
        catch(e){
            console.log(e);
        alert(e.response.data);
            
        }
    }
  
    
  return (
    <div className='min-h-[170px] w-[90%]  md:w-[80%] mx-auto  p-5 px-6 bg-white border-[0.5px] border-solid rounded-sm border-gray-300 flex justify-between ' >
        <div className='flex flex-col  ' >
            <h1 className='uppercase font-semibold ' >{data.name}'<span className='lowercase' >s</span></h1>
            <span className='font-normal' >{data.roomType} Room</span>
            <span>{data.guests} Guests </span>
            <div className='flex gap-3 text-xl mt-10 ' >
                <span onClick={()=>{setopenModal(true)}} className='cursor-pointer' ><FaRegEdit  /></span>
                <span onClick={()=>{handleDelete()}} className='cursor-pointer' ><MdDeleteOutline /></span>
            </div>
        </div>
        <div className='flex flex-col justify-center' >
            <p><b>In</b>: {data.checkIn.split('T')[0]}</p>
            <p><b>Out</b>: {data.checkIn.split('T')[0]}</p>
        </div>
        <div className='flex items-center' >
            <button className=' rounded-sm bg-[#d11242] text-white px-3 py-2 '>Pay &nbsp;₹{data.price}/- </button>
        </div>
        {
            openModal?
            <BookingModal data={data} setopenModal={setopenModal} />
            :null
        }
    </div>
  )
}

export default BookingCard