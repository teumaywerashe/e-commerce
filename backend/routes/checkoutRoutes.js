import express from "express";
import { auth } from "../middleWares/protected.js";
import Checkout from "../models/Checkout.js";
import { Cart } from "../models/Cart.js";
export const checkoutRouter = express.Router();

checkoutRouter.post("/", auth, async(req, res) => {
    const {
        checkoutItems,
        shippingAdress,
        paymentMethod,
        totalPrice,
        isPaid,
        paidAt,
        paymentDetails,
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
            paymentDetails,
        });

        console.log(`checkout create for the user:${req.user._id}`);
    } catch (error) {
        console.log("error creating the checkout");
        res.status(500).json({ success: false, msg: "server error" });
    }
});

checkoutRouter.put("/:id/pay", auth, async(req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res
                .status(404)
                .json({ success: false, msg: "Checkout Not Found" });
        }

        if (!paymentStatus) {
            ((checkout.isPaid = true),
                (checkout.paymentStatus = paymentStatus),
                (checkout.paymentDetails = paymentDetails),
                (checkout.paidAt = Date.now()));
            await checkout.save();
            res.status(200).json({ success: true, checkout });
        } else {
            res.status(400).json({ succcess: false, msg: "Invalid Payment Status " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

checkoutRouter.post("/:id/finalize", auth, async(req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ success: false, msg: "Checkout not found!" });
        }
        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.orderItems,
                shippingAdress: checkout.shippingAdress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: Checkout.paymentDetails,
            });
            checkout.isFinalized = true
            checkout.finalizedAt - Date.now()
            await Checkout.save()

            await Cart.findOneAndDelete({ user: checkout.user })

            res.status(200).json({ success: true, finalOrder })
        } else if (checkout.isFinalized) {
            res.status(400).json({ success: false, msg: "order is already finalized" })
        } else {
            res.status(400).json({ succcess: false, msg: "checkout  is not paid" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" })
    }
});