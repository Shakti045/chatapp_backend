const express=require('express')
const router=express.Router();
const {getfriendrequests,sendfriendrequest,deletefriendrequest,acceptfriendrequest,declinefriendrequest}=require('../contolers/friendrequest')
const {auth}=require('../middlewares/auth')
const {login}=require('../contolers/login')
const {signup}=require('../contolers/signup')
const {getuser}=require('../contolers/getuser')
const {addchat,getchats,deletechat}=require('../contolers/message')
const {getallfriends}=require('../contolers/getallfriends')
const {getuserdetails}=require('../contolers/userdetails')
const {uploadfiletocloudinary}=require('../contolers/fileupload')
router.post("/signup",signup)
router.post("/login",login)
router.post("/sendrequest",auth,sendfriendrequest)
router.post("/deleterequest",auth,deletefriendrequest);
router.post("/acceptfriend",auth,acceptfriendrequest);
router.post("/declinefriend",auth,declinefriendrequest);
router.post("/getuser",getuser);
router.post("/addchat",auth,addchat);
router.post("/getchats",auth,getchats)
router.delete("/deletechat",auth,deletechat);
router.post("/getallfriends",auth,getallfriends)
router.post("/getuserdetails",auth,getuserdetails);
router.post("/getfrequests",auth,getfriendrequests)
router.post("/upload",uploadfiletocloudinary);
module.exports=router;