const jwt=require('jsonwebtoken');

const VerifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
      return res.status(401).json('USER UNAUTHORIZED');
    }
     jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error) return res.status(403).json('FORBIDDEN TOKEN');
        req.user=user;
        next();
    })

}

module.exports=VerifyToken;