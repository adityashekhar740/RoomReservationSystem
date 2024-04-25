import axios from 'axios';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { LogOutStart,LogOutSuccess,LogOutFailure } from '../Redux/user/userSlice';
function BottomBar() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {currentUser}=useSelector((state)=>state.user);
  const handleLogout=async(e)=>{
    dispatch(LogOutStart());
    try{
      const res=await axios.get('/api/auth/signout');
      dispatch(LogOutSuccess());
      navigate('/signin');
    }
    catch(e){
      dispatch(LogOutFailure(e.data.message));
    }
  }
  return (
    <div className=' bottom-[1px] text-white justify-center items-center gap-7 flex  w-[100%] left-0 md:bottom-0 h-[6%] border-t-[1px] border-solid border-[gray] bg-black absolute z-[12] ' >
        {
          currentUser!==null?<Link onClick={(e)=>{handleLogout(e)}} >Logout</Link>:<Link>Login</Link>
        }
        <div className='' >Terms & conditions</div>
        {/* <h1>sfsg</h1> */}
    </div>
  )
}

export default BottomBar