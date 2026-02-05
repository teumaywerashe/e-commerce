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
        paymentDetail,
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
            paymentDetail,
        });

        console.log(`checkout create for the user:${req.user._id}`);
    } catch (error) {
        console.log("error creating the checkout");
        res.status(500).json({ success: false, msg: "server error" });
    }
});

checkoutRouter.put("/:id/pay", auth, async(req, res) => {
    const { paymentStatus, paymentDetail } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res
                .status(404)
                .json({ success: false, msg: "Checkout Not Found" });
        }

        if (!paymentStatus) {
            checkout.isPaid = true,
                checkout.paymentStatus = paymentStatus,
                checkout.paymentDetail = paymentDetail,
                checkout.paidAt = Date.now()
            await checkout.save()
            res.status(200).json({ success: true, checkout })
        } else {
            res.status(400).json({ succcess: false, msg: "Invalid Payment Status " })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// checkoutRouter.post('/')