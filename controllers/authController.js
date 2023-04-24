const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

// this is for testing purposes only
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: {
            users,
        }
    });
}

exports.signup = async (req, res) => {

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        if (!username || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide a valid username and password",
            });
        }

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            }
        });
        
    } catch (err) {

        if (err.code === 11000) {
            res.status(400).json({
                status: "fail",
                message: "This username is already taken",
            });
        } else {
            console.log(err.message);
            res.status(400).json({
                status: "fail",
                message: err.message,
            });
        }
    }
}

exports.login = async (req, res) => {
    
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if (isCorrect) {
            req.session.user = user;
            res.status(200).json({
            status: "success",
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "Incorrect username or password",
            });
        }
            
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}
