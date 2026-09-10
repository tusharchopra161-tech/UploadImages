const fs = require("fs")
const postSignup = (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password)
    let data = fs.readFileSync("./data/users.json", "utf-8");
    data = JSON.parse(data)
    data.push({
        name,
        password,
        email,
        id: new Date().getTime()
    })
    fs.writeFileSync("./data/users.json", JSON.stringify(data))
    console.log(data)
    res.status(201).json({
        success: true,
        message: "Signup successful",
    })
}
module.exports = { postSignup }