const User=require('../modals/User')
exports.getallfriends=async (req,res)=>{
    try{
        const id=req.user.id;
        const friends=await User.findById({_id:id}).populate("friends").exec();
        return res.status(200).json({
            "Success":true,
            "Message":"All friends fetched successfully",
            "Friends":friends.friends
        })
    }catch(err){
        console.log("Error while fetching friends","=>",err);
        res.status(500).json({
            "Success":false,
            "Message":"Error while fetching friends"
        })
    }
}