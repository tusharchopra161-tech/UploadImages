const dotenv=require("dotenv");
dotenv.config()
const express=require("express");
const cors=require("cors");
const path=require("path")
const multer=require("multer")
const connectDb=require("./config/db.js")
const ejs=require('ejs')
const {loginRoute,signupRoute,userRoute}=require("./routes");
const uploadImage = require("./utils/fileUpload");
const app=express()
const fs=require('fs')
const Media=require("./models/mediaModel");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       return cb(null,"./uploadfile")
    },
    filename:(req,file,cb)=>{ 
        const suffix=Date.now()
        const baseName=path.basename(file.originalname)
        const ext=path.extname(file.originalname)
           return cb(null,`${baseName}-${suffix}${ext}`)
    }
})
const upload=multer({storage:storage,
    limits:{
        fileSize:100*1024*1024
    }
})


app.set('view engine','ejs');
app.use(cors())
// app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/users",userRoute)
app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.get("/",(req,res)=>{
    console.log("hlo")
 res.render("imgForm")
})
// main upload function 
app.post(
  "/upload",
  upload.single("profileImage"),
  async (req, res) => {
    console.log("post route")
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      const path = file.path;

      console.log("Local file path:", path);

      // Upload image to Cloudinary
      const uploadfile = await uploadImage("profileImage", path);

      console.log("Cloudinary response:", uploadfile);

      // Save Cloudinary data in MongoDB
      const media = await Media.create({
        mediaUrl: uploadfile.secure_url,
        publicId: uploadfile.public_id,
        mediaType: "image",
        originalName: file.originalname,
      });

      // Delete temporary local file
      fs.unlink(path, (err) => {
        if (err) {
          console.log("unlink error:", err);
        }
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        media: media,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Image upload failed",
        error: error.message,
      });
    }
  }
);

app.listen(process.env.PORT,async ()=>{
    await connectDb()
    console.log("server listen at 3000")
})

