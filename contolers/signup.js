const User=require('../modals/User')
const bcrypt=require('bcrypt')
exports.signup=async(req,res)=>{
    try{
        const {username,email,password,avatarurl}=req.body;
        if(!username || !email || !password || !avatarurl){
            return res.status(400).json({
                "Success":false,
                "Message":"All fields required"
            })
        }
        const userfound=await User.findOne({username:username}) || await User.findOne({email:email})
        if(userfound){
            return res.status(400).json({
                "Success":false,
                "Message":"User already exists knidly try with different username and email"
            })
        }
        const hashedpassword=await bcrypt.hash(password,10);
        let chatapptoken=Date.now()
        for(let a=0;a<1;a++){
            chatapptoken=chatapptoken+Math.floor(Math.random()*1000)
        }
        chatapptoken=new Number(chatapptoken);
        await User.create({username,email,password:hashedpassword,avatarurl,chattoken:chatapptoken});
        return res.status(200).json({
            "Success":true,
            "Message":"User created sucessfully"
        })
    }catch(err){
        console.log("Error while creating a user","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Something error occured"
        })
    }
}