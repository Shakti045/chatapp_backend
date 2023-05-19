const mongoose=require('mongoose');
const Userschema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    avatarurl:{
        type:String,
        required:true,
        default:null
    },
    friendrequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    chattoken:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("User",Userschema);