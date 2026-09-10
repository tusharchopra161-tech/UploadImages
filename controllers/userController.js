const fs=require('fs')
const getUsers=(req,res)=>{
    let {email,password}=req.body
    console.log(email,password)
    let data=fs.readFileSync("./data/users.json","utf-8")
    data=JSON.parse(data)
    let currentUser=data.filter(obj=>obj.email===email && obj.password===parseInt(password))
    if(currentUser.length>0)
    {
        res.send(currentUser)
    }else{
        res.send("user details are not found")
    }
}
const deleteUsers=(req,res)=>{
    const id = Number(req.params.id);
    let users = JSON.parse(
        fs.readFileSync("./data/users.json","utf-8")
    );
    users = users.filter(user => user.id !== id);
    fs.writeFileSync(
        "./data/users.json",
        JSON.stringify(users, null, 2)
    );
    res.json({
        success:true,
        message:"Account deleted successfully."
    });
    
}
module.exports={getUsers,deleteUsers}