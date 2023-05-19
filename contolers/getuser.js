const User=require('../modals/User')
exports.getuser=async(req,res)=>{
    try{
        const {username}=req.body;
        if(!username){
            return res.status(400).json({
                "Success":false,
                "Message":"Please enter the username"
            })
        }
        const user=await User.findOne({username:username})
        if(!user){
            return res.status(400).json({
                "Success":false,
                "Message":"User not found"
            })
        }
        return res.status(200).json({
            "Success":true,
            "Message":"User fetched successfully",
            "User":user
        })
    }catch(err){
        console.log("Error while finding the user","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Server error,Please try after sometime"
        })
    }
}