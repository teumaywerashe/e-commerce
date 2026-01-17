import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 0,
    },
}, { _id: false });
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: String,
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);