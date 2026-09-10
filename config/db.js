const mongoose=require("mongoose");
const dbURI=process.env.DB_URI
async function connectDB(){
    try{
        const result =await mongoose.connect(dbURI)
        console.log("db is connected")
    }catch(err){
        console.log("db not connected ",err)
    }
}
module.exports=connectDB