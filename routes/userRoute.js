const {getUsers,deleteUsers}=require("../controllers")
const express=require('express');
const router=express.Router()
router.get("/",getUsers)
router.delete("/:id",deleteUsers)
module.exports=router