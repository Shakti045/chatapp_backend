const User=require('../modals/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.login=async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        if((!username && !email) || !password){
            return res.status(400).json({
                "Sucess":false,
                "Message":"All fields required to lognin"
            })
        }
       const searchvalue=email!=null?email:username;
       const user=await User.findOne({email:searchvalue}) || await User.findOne({username:searchvalue})
       if(!user){
        return res.status(400).json({
            "Success":false,
            "Message":"User not found kindly create a new account"
        })
       }
       const verified=await bcrypt.compare(password,user.password);
       if(!verified){
        return res.status(400).json({
            "Success":false,
            "Message":"Password invalid"
        })
       }
       const payload={
        id:user._id,
        username:user.username,
        avatarurl:user?.avatarurl,

       }
       const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"3h"})
       const options={
        httpOnly:true,
        expires:new Date(Date.now() + 3*24*60*60*1000)
       }
       res.cookie("chatapptoken",token,options).status(200).json({
        "Success":true,
        "Message":"Login successfull",
        "token":token,
         "userid":user._id,
         "chatapptoken":user.chattoken
       })
    }catch(err){
        console.log("Error while login",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Something error occured during login"
        })
    }
}