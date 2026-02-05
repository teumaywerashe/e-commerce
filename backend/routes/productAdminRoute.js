import express from "express";
import { admin, auth } from "../middleWares/protected.js";
import { Product } from "../models/Product.js";

export const productAdminRoute = express.Router();
productAdminRoute.get("/", auth, admin, async(req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            res.status(404).json({ successs: false, msg: "No products found to display" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});