import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogOutStart, LogOutSuccess, LogOutFailure } from '../Redux/user/userSlice';
import axios from 'axios';

function BottomBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    dispatch(LogOutStart());
    try {
      const res = await axios.get('/api/auth/signout');
      dispatch(LogOutSuccess());
      navigate('/signin');
    } catch (e) {
      dispatch(LogOutFailure(e.response.message));
      console.log(e);
    }
  };

  return (
    <div className="bottom-0 text-white justify-center items-center gap-7 flex w-full left-0 md:bottom-0 h-[6%] border-t-[1px] border-solid border-[gray] bg-black fixed z-[12]">
      {currentUser !== null ? (
        <Link onClick={(e) => { handleLogout(e) }} >Logout</Link>
      ) : (
        <Link to={'/signin'}>Login</Link>
      )}
      <Link to={'/bookings'}>Your Bookings</Link>
    </div>
  );
}

export default BottomBar;



