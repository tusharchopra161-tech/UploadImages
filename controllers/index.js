const {postSignup}=require("./postSignupController")
const {getUsers,deleteUsers}=require("./userController")
const {postLogin}=require("./postLoginController")
module.exports={postSignup,getUsers,deleteUsers,postLogin}