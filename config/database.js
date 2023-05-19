const mongoose=require('mongoose')
require('dotenv').config();
async function connetdb(){
    try{
     await mongoose.connect(process.env.DB_URL);
     console.log("db connection successfull");
    }catch(err){
        console.log("db connection failed","=>",err);
    }
}

module.exports=connetdb;