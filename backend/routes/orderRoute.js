import express from 'express'
import Order from '../models/Order.js'
import { auth } from '../middleWares/protected.js'

export const orderRoute = express.Router()

orderRoute.get('/my-orders', auth, async(req, res) => {
    try {
        const userOrders = (await Order.find({ user: req.user._id })).toSorted({ createdAt: -1 });
        res.status(200).json({ success: true, userOrders })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
})


orderRoute.get('/orders/:id', auth, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if (!order) {
            return res.status(404).json({ success: false, msg: "Order not found" })
        }
        res.status(200).json({ success: true, msg: order })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
})