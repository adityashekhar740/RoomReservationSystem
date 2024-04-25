const express=require('express');
const router=express.Router();
const {Signin,Signup,Signout}=require("../controllers/Auth.Controllers");

router.post('/signup',Signup);
router.post('/signin',Signin);
router.get('/signout',Signout);
module.exports=router;