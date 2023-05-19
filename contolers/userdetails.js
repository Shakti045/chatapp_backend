const User=require('../modals/User')
exports.getuserdetails=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findById({_id:id}).populate("friends").populate("friendrequests").exec();
        return res.status(200).json({
            "Success":true,
            "Message":"Userdetails fetched successfully",
            "User":user
        })
    }catch(err){
        console.log("Error while fetching the serdetails","=>",err);
        res.status(500).json({
            "Success":false,
            "Message":"Error while fetching user details"
        })
    }
}