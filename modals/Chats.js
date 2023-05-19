const mongoose=require('mongoose');
const Chatschema=mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    users:[{
      type:String,
      required:true
    }],
    message:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports=mongoose.model("Chat",Chatschema)