const { response } = require("express");
const userModle = require("../models/user");
const trackModel  =require('../models/track')
const bcrypt = require("bcryptjs");
require('dotenv').config();

const signUp = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Input validation
        if (!name || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both username and password"
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await userModle.findOne({ name });
        if (existingUser) {
            return res.status(409).json({  // Using 409 Conflict for existing resource
                success: false,
                message: "Username already exists"
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await userModle.create({
            name,
            password: hashedPassword
        });

        // Remove password from response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            // Add other non-sensitive fields here
        };

        return res.status(201).json({  // Using 201 Created for resource creation
            success: true,
            data: userResponse,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error('Signup error:', error);  // Log error for debugging
        return res.status(500).json({  // Using 500 for server errors
            success: false,
            message: "Internal server error during signup"
        });
    }
};

const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if all fields are provided
        if (!name || !password) {
            return res.status(400).json({ message: "Enter all credentials" });
        }

        let user = await userModle.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
      const response = await trackModel.findOne({userId : user._id});
       
        return res.status(200).json({ message: "Login successful" ,userId:user._id,isOld:response});

    }  catch (error) {
        return res.json({
            success: false,
            message: "There is some error in login"
        });
    }
};

const signOut = async (req, res) => {
     
    return res.json({
        success: true,
        message: 'loggedOut Successfully'
    })

}



module.exports = {signUp, login , signOut}