const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.auth=(req,res,next)=>{
  try{
    const token=req.cookies.chatapptoken || req.body.token || req.header("Authorization").replace("Bearer ","");
    if(!token){
        return res.status(400).json({
            "Success":false,
            "Message":"Invalid token"
        })
    }
     const payload=jwt.verify(token,process.env.JWT_SECRET)
     req.user=payload;
     next();

  }catch(err){
    console.log("Error while verifying token","=>",err);
    res.status(500).json({
        "Success":false,
        "Message":"Error while verifying token"
    })
  }
}


// exports.isfriend=(req,res,next)=>{
//   try{
//      const {receiver}=req.body;
//      const friends=req.user.friends
//      if(!friends.includes(receiver)){
//       return res.status(400).json({
//         "Success":false,
//         "Message":"You are not friend of each other"
//       })
//      }
//      next();
//   }catch(err){
//      console.log("Error while checking friends","=>",err);
//      res.status(500).json({
//       "Success":false,
//       "Message":"Error while checking friend"
//      })
//   }
// }