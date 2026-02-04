import express from "express";
import { auth } from "../middleWares/protected.js";
import Checkout from "../models/Checkout.js";
export const checkoutRouter = express.Router();

checkoutRouter.post("/", auth, async(req, res) => {
    const {
        checkoutItems,
        shippingAdress,
        paymentMethod,
        totalPrice,
        isPaid,
        paidAt,
        paymentdetail,
    } = req.body;

    console.log(checkoutItems, shippingAdress, PaymentAddress);
    if (!checkoutItems || checkoutItems.length === 0) {
        res.status(400).json({ success: false, msg: "no items in the checkout" });
    }
    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAdress,
            paymentMethod,
            totalPrice,
            isPaid,
            paidAt,
            paymentdetail,
        });

        console.log(`checkout create for the user:${req.user._id}`);
    } catch (error) {}
});