import express from 'express'
import Subscriber from '../models/subscriber.js'
export const subscriberRoute = express.Router()


subscriberRoute.post('/', async(req, res) => {
    try {

        const { email } = req.body
        if (!email) {
            return res.status(404).json({ success: false, msg: "Email is required" })
        }
        let subscriber = await Subscriber.findOne({ email })
        if (email) {
            return res.status(400).json({ success: false, mag: "Subscriber with this email already exist" })
        }
        subscriber = new Subscriber({ email })
        await subscriber.save()
        res.status(201).json({ success: true, msg: 'Successfulliy subscribed to the newsletter!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Server ErRor"
        })
    }
})

subscriberRoute.get('', async() => {})