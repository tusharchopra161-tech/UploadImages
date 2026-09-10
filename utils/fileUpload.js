const cloudinary =require("../config/cloudinary")
const uploadImage=async (folder,filePath)=>{
    try{
        return await cloudinary.uploader.upload(filePath,{folder})
    }catch(err){
        return {err}
    }
}
module.exports=uploadImage