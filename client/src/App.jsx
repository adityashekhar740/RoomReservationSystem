import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import BottomBar from './components/BottomBar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Bookings from './pages/Bookings';
import PrivateRoutes from './components/PrivateRoutes';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Home />}/>
      <Route element={<PrivateRoutes/>} >
        <Route path='/bookings' element={<Bookings/>} /> 
        </Route>  
      <Route path='/signin' element={<Signin/>} />   
      <Route path='/signup' element={<Signup/>} />   
    </Routes>
    <BottomBar/>
    </BrowserRouter>
    
  )
}

export default App