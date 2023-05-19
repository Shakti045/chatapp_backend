const Chat=require('../modals/Chats')
exports.addchat=async (req,res)=>{
    try{
       const sender=req.user.username;
       const {receiver,message}=req.body;
    //    console.log(receiver,message);
       if(!sender || !receiver || !message){
        return res.status(400).json({
            "Success":false,
            "Message":"All fields required"
        })
       }
       await Chat.create({sender:sender,receiver:receiver,users:[sender,receiver],message:message})
       res.status(200).json({
        "Success":true,
        "Message":"Message sent successfully"
       })
    }catch(err){
        console.log("Error while sending message","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Please try again"
        })
    }
}

exports.getchats=async (req,res)=>{
    try{
        const user1=req.user.username;
        const {user2}=req.body;
        const chats=await Chat.find({users:{$all:[user1,user2]}}).sort({createdat:1})
        return res.status(200).json({
            "Success":true,
            "Message":"All chats fetched successfully",
            "Chats":chats
        })
    }catch(err){
        console.log("Error while fetching all chats","=>",err);
        return res.status(500).json({
            "Success":false,
            "Message":"Server error while getting all chats"
        })
    }
}

exports.deletechat=async (req,res)=>{
    try{
        const {chatid}=req.body;
        await Chat.findByIdAndDelete({_id:chatid})
        res.status(200).json({
            "Success":true,
            "Message":"Chat deleted successfully"
        })
    }catch(err){
      console.log("Error while deleting chat","=>",err);
      res.status(500).json({
        "Success":false,
        "Message":"Sorry something went wrong"
      })
    }
}