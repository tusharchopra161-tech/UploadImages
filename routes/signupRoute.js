const express=require("express");
const {validateSignup}=require("../middlewares/signupMiddleware")
const router=express.Router();
const {postSignup}=require("../controllers")
router.post("/",validateSignup,postSignup);
module.exports=router