const fs = require("fs")
const postLogin = (req, res) => {
    const { email, password } = req.body;
    console.log("login Route", email, password)
    let data = fs.readFileSync("./data/users.json", "utf-8")
    data = JSON.parse(data)

    const currentUser = data.find(
        obj =>
            obj.email === email &&
            String(obj.password) === String(password)
    );
    if (currentUser) {
        return res.json({
            success: true,
            user: currentUser
        });
    }
    return res.json({
        success: false,
        message: "Invalid user"
    });

}
module.exports = { postLogin }