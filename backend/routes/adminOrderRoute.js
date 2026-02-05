import express from "express";
import { admin, auth } from "../middleWares/protected.js";
import Order from "../models/Order.js";

export const adminOrderRoute = express.Router();

adminOrderRoute.get("/", auth, admin, async(req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders) {
            return res.status(404).json({ success: false, msg: "No Orders Found" });
        }
        res.status(200).json({ success: true, orders });
    } catch (error) {}
});
adminOrderRoute.put("/:id", auth, admin, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, msg: "Order not found" });
        }
        order.status = req.body.status || order.status;
        req.body.status === "Delivered" ? true : order.isDelivered;
        order.isDelivered = order.deliveredAt =
            req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();

        res.status(201).json({ success: true, msg: "Order updated successifully", updatedOrder, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});
adminOrderRoute.delete('/:id', auth, admin, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            res.status(404).json({ success: false, msg: "Order Not Found" })
        }
        await order.deleteOne()
        res.status(200).json({ success: true, msg: "Order deleted successifully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: "Server Error" })
    }
})