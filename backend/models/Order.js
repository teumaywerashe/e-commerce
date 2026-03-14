import mongoose, { mongo } from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { _id: false }, );

export const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    shippingAdress: {
        adress: { type: String, required: true },
        postalCode: { type: String, required: true },

        city: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: String },
    isDelivered: { type: Boolean, default: false },
    paymentStatue: { type: String, default: 'Pending' },
    paymentDetails: { type: mongoose.Schema.Types.Mixed },
    status: {
        type: String,
        enum: ['Processing', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
}, { timestamps: true });


export default mongoose.model('Orders', orderSchema)