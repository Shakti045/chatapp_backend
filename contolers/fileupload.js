const {uploadfile}=require('../utils/file')
exports.uploadfiletocloudinary=async(req,res)=>{
    try{
        const file=req.files.file;
        if(!file){
            return res.status(400).json({
                Success:false,
                Message:"Invalid request"
            })
        }
        const fileuploaded=await uploadfile(file);
        return res.status(200).json({
            Success:true,
            Message:"File uploaded uccessfully",
            "filelink":fileuploaded.secure_url
        })
    }catch(err){
        console.log("Error while uploading file","=>",err);
        res.status(500).json({
            Success:false,
            Message:"Server error while uploading to cloudinary"
        })
    }
}