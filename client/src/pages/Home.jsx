import React, { useState } from 'react'
import axios from 'axios';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
function Home() {
    const {currentUser}= useSelector((state)=>state.user);
    const [modalOpen, setmodalOpen] = useState(false);
    const [Rooms, setRooms] = useState(null);
    const [formData, setformData] = useState({
        name: '',
        checkIn:'',
        checkOut:'',
        guests:null,
        roomType:'',
        phone:0,
        address:'',
        email:'',
        message:'',
        amenities:[],
        roomId:'',
        userId:'',
        
    })
    const handleChange=(e)=>{
        const {id,value} = e.target;
        setformData({
            ...formData,[id]:value
        })
    }


const handleSubmit=async(e)=>{
    e.preventDefault();
    if(formData.roomType===''){
        return  alert('Please select a Room Type');
    }
    try{
        const res=await axios.post('/api/reservations/checkAvail',{roomType: formData.roomType});
    setRooms(res.data);
    setformData({...formData,roomId:res.data._id});
    setmodalOpen(true);
    }
    catch(e){
        alert(e.response.data);
    }
}

  return (
    <>
        <div className='w-[100vw] h-[100vh]  ' >
            <img className='z-[4] w-[40%] left-[30%] absolute md:w-[11%]  md:left-[43%] top-[7%] ' src="https://wi-q.cloud/i/400x,q95/b0a747e4-b654-4b66-b958-06e3cb2b722a/asset/65c8fc53-7795-44ae-81c1-446915b74071.png" alt="" />
            <img className=' z-[1] opacity-90  h-full w-full object-cover' src="https://wi-q.cloud/b0a747e4-b654-4b66-b958-06e3cb2b722a/asset/f697e069-8b79-4d12-ba2b-f0eb63ff2642.jpg" alt="" />
            <div className='absolute h-[54%] left-0 bottom-[6%] bg-black w-[100%] md:h-[30%] rounded-t-[100px] p-5 flex flex-col gap-6 ' >
                <div>
                    <h1 className='text-white font-semibold text-center text-2xl' >HILTON LONDON HEATHROW ROOMS</h1>
                </div>
                <form onSubmit={(e)=>{handleSubmit(e)}} action="">
                    <div className='bg-[#ece9e9] py-4 px-2 flex flex-wrap gap-9 justify-center  w-[96%] mx-auto rounded-sm ' >
                        <div className='flex flex-col text-sm' >
                            <label htmlFor="name">Your Name</label>
                            <input onChange={(e)=>{handleChange(e)}} className='py-[9px] px-2 w-[270px] border-[1px] border-solid border-gray-400  ' placeholder='Enter your name' type="text" name="" id="name" />

                        </div>
                        <div className=' flex flex-col' >
                            <label className='text-sm' htmlFor="checkIn">Check In</label>
                            <input onChange={(e)=>{handleChange(e)}} className='py-[6px] px-2 max-w-[220px] border-[1px] border-solid border-gray-400 '  type="date" name="checkIn" id="checkIn" />
                        </div>
                        <div className=' flex flex-col' >
                            <label className='text-sm' htmlFor="checkOut">Check Out</label>
                            <input onChange={(e)=>{handleChange(e)}} className='py-[6px] px-2 max-w-[220px] border-[1px] border-solid border-gray-400 '  type="date" name="date" id="checkOut" />
                        </div>
                        <div className=' flex flex-col' >
                            <label className='text-sm' htmlFor="guests">Total Guests</label>
                            <input onChange={(e)=>{handleChange(e)}} className='py-[6px] px-2 max-w-[160px] border-[1px] border-solid border-gray-400 '  type="number" name="guests" id="guests" />
                        </div>
                        <div className=' flex flex-col' >
                            <label className='text-sm' htmlFor="roomType">Room Preference</label>
                            <select onChange={(e)=>{handleChange(e)}} className='py-[6px] px-2 max-w-[160px] border-[1px] border-solid border-gray-400 ' name="" id="roomType">
                                <option value="select">select</option>
                                <option value="queen">Queen</option>
                                <option value="sweet">Sweet</option>
                                <option value="superDeluxe">Super Deluxe</option>
                                <option value="twinRoom">Twin Room</option>
                            </select>
                        </div>
                        <div className=' flex flex-col' >
                            <button className='bg-[#d11242]  text-white px-10 rounded-sm py-4   ' >CHECK AVAILABILITY</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {
            modalOpen?<Modal setformData={setformData} formData={formData} Rooms={Rooms} handleChange={handleChange}  setmodalOpen={setmodalOpen}  />:null
        }
    
    </>
  )
}

export default Home