import express from "express";
import { admin, auth } from "../middleWares/protected.js";
import { User } from "../models/userModel.js";
export const adminUsersRoute = express.Router();

adminUsersRoute.get("/", auth, admin, async(req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(400).json({ success: false, msg: "Users Not Found" });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, msg: "Server Error" });
    }
});

adminUsersRoute.post("/", auth, admin, async(req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res
                .status(400)
                .json({ success: false, msg: "Users with this email already exist" });
        }
        const user = await User.create({
            name,
            email,
            password,
            role: role || "customer",
        });
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, msg: "Server Error" });
    }
});

adminUsersRoute.put("/:id", auth, admin, async(req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.findById(req.params.id);

        const exist = await User.findOne({ email });
        if (exist) {
            return res
                .status(400)
                .json({ success: false, msg: "Users with this email already exist" });
        }
        user.email = email || user.email;
        user.name = name || user.name;
        user.role = role || user.role;
        user.password = password || user.password;
        user.save();

        res.status(201).json({ success: true, msg: "User Updated successifully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, msg: "Server Error" });
    }
});
adminUsersRoute.delete('/:id', auth, admin, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).json({ success: false, msg: "No user found with this id!" })
        } else {
            res.status(200).json({ success: true, mag: "User deleted successifuly" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: "Server Error" })
    }
})