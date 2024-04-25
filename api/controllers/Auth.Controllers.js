const userModel=require("../models/UserModel");
const RoomsModel=require('../models/RoomsModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Signup=async(req,res)=>{
     const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser =await userModel.create({
    username,
    email,
    password:hashedPassword,
  });
  try {
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json('Unable to Register');
  }
}

const Signin=async(req,res)=>{
     const {username,password}=req.body
  const validateUser=await userModel.findOne({username})
  if(!validateUser){
   return res.status(404).json('User not found');
  }

    const validatePassword= bcrypt.compareSync(password,validateUser.password);
  if(!validatePassword){
   return res.status(401).json('Wrong Credentials');    
  }
  const token = jwt.sign({id:validateUser._id},`${process.env.JWT_SECRET}`);
  const {password:pass,...rest}=validateUser._doc;                        
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);       
  
}

const Signout=async(req,res)=>{
  try{
    res.clearCookie('access_token');
    res.status(200).json('SUCCESSFULLY LOGGED OUT');
  }
  catch(e){
    res.status(500).json('UNABLE TO LOGOUT');
  }
}

module.exports={Signin,Signup,Signout}