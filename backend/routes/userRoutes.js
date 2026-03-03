import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
// import { useReducer } from "react";
import { auth } from "../middleWares/protected.js";

export const userRouter = express.Router();

// create token
const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};


// register user
userRouter.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required",
            });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({
                success: false,
                msg: "User already exists, please login",
            });
        }

        const user = await User.create({ name, email, password });

        const token = createToken({ userId: user._id, role: user.role });
        res.status(201).json({
            success: true,
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
});


// login user
userRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "user not found please sign up" });
        }
        const isMatchPassword = await user.matchPassword(password);
        if (!isMatchPassword) {
            return res
                .status(400)
                .json({ success: false, msg: "invalide credential" });
        }

        const token = createToken({ userId: user._id, role: user.role });

        res.status(200).json({
            success: true,
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, msg: "server Error" });
    }
});

// get usr profile
userRouter.get("/profile", auth, async(req, res) => {
    res.status(200).json(req.user)
});