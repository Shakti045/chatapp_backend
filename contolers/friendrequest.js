const User=require('../modals/User')
exports.sendfriendrequest=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {receiverid}=req.body;
        await User.findByIdAndUpdate({_id:receiverid},{$push:{friendrequests:userid}})
        return res.status(200).json({
            "Success":true,
            "Message":"Friendrequest sent successfully"
        })
    }catch(err){
        console.log("Error while sending friend request","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Error while sending friend request"
        })
    }
}

exports.deletefriendrequest=async (req,res)=>{
    try{
        const userid=req.user.id;
        const {receiverid}=req.body;
        await User.findByIdAndUpdate({_id:receiverid},{$pull:{friendrequests:userid}})
        return res.status(200).json({
            "Success":true,
            "Message":"Friendrequest deleted successfully"
        })
    }catch(err){
        console.log("Error while deleting friend request","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Error while deleting friend request"
        })
    }
}

exports.acceptfriendrequest=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {senderid}=req.body; 
        await User.findByIdAndUpdate({_id:userid},{$push:{friends:senderid},$pull:{friendrequests:senderid}})
        await User.findByIdAndUpdate({_id:senderid},{$push:{friends:userid}})
        return res.status(200).json({
            "Success":true,
            "Message":"Friend added successfully"
        })
}catch(err){
    console.log("Error while adding friend","=>",err);
    return res.status(500).json({
        "Success":false,
        "Message":"Error while adding friend"
    })
}
}

exports.declinefriendrequest=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {senderid}=req.body; 
        await User.findByIdAndUpdate({_id:userid},{$pull:{friendrequests:senderid}})
       return res.status(200).json({
            "Success":true,
            "Message":"Friendrequest removed successfully"
        })
}catch(err){
    console.log("Error while deletingfriendrequest","=>",err);
    return res.status(500).json({
        "Success":false,
        "Message":"Error while deletingfriendrequest "
    })
}
}

exports.getfriendrequests=async(req,res)=>{
    try{
        const userid=req.user.id;
        const user=await User.findById({_id:userid}).populate("friendrequests").exec();
        return res.status(200).json({
            "Success":true,
            "Message":"Data fetched successfully",
            "Friendrequests":user.friendrequests
        })
    }catch(err){
        console.log("Error while fetching friendrequestd","=>",err);
        res.status(500).json({
            "Success":false,
            "Message":"Error while fetching friendrequestd"
        })
    }
}