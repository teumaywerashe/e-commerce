import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscribeAt: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model('Subscriber', subscriberSchema)