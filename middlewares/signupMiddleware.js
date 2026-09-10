const fs = require("fs");

const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }
    
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least 6 characters."
        });
    }

    let users = fs.readFileSync("./data/users.json", "utf-8");
    users = users ? JSON.parse(users) : [];

   
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "Email already exists."
        });
    }

    next();
};

module.exports = {validateSignup};