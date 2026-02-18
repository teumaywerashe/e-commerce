import express from "express";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { auth } from "../middleWares/protected.js";
export const cartRouter = express.Router();

const getCart = (userId, guestId) => {
    if (userId) {
        return Cart.findOne({ user: userId });
    } else if (guestId) {
        return Cart.findOne({ guestId });
    } else return null;
};

// add to cart
cartRouter.post("/", async(req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, msg: "Product Not Found" });
        }
        let cart = await getCart(userId, guestId);
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url[0],
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url[0],
                    price: product.price,
                    size,
                    color,
                    quantity,
                }, ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json({ newCart });
        }
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});


// fetch cart
cartRouter.get("/", async(req, res) => {
    try {
        const carts = await Cart.find();
        if (!carts) {
            return res.status(400).json({ success: false, msg: "No cart found" });
        }
        res.status(200).json({ success: true, carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
});

// update cart
cartRouter.put("/", async(req, res) => {
    const { productId, quantity, color, size, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(400).json({ success: false, msg: "cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );
        if (productIndex !== -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price,
                0
            );
            cart.save();
            res.status(200).json({ success: true, cart });
        } else {
            res.status(400).json({ success: false, msg: "Product not font in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
});


// delete cart
cartRouter.delete("/", async(req, res) => {
    const { size, color, userId, guestId, productId } = req.body;
    try {
        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ success: false, msg: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(
            (p) =>
            p.size === size &&
            p.productId.toString() === productId &&
            p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalQuantity = cart.products.reduce(
                (acc, item) => item.quantity * item.price + acc,
                0
            );
            await cart.save();
            res.status(200).json({ success: true, cart, msg: "cart deleted " });
        } else {
            res.status(400).json({ success: false, msg: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ succcess: false, msg: "Server error" });
    }
});

// fetch userCart
cartRouter.get("/", async(req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ success: false, msg: "cart  not found" });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ successs: false, msg: "server Error" });
    }
});


// merge cart
cartRouter.post("/merge", auth, async(req, res) => {
    const { guestId } = req.body;
    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res
                    .status(400)
                    .json({ success: false, msg: "No guest cart found" });
            }
            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => {
                        item.productId.toString() === guestItem.productId.toString() &&
                            item.color === guestItem.color &&
                            item.size === guestItem.size;
                    });

                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        userCart.products.push(guestItem);
                    }
                });
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                await userCart.save();

                try {
                    await Cart.findOnAndDelete({ guestId });
                } catch (error) {
                    console.error("Error deleting the guestCart", error);
                }

                res.status(200).json({ success: true, userCart });
            } else {
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
            }
        } else {
            if (userCart) {
                return res.status(200).json({ success: true, userCart })
            }
            res.status(404).json({ msg: 'guestCart not found', success: false })
        }
    } catch (error) {
        console.log(error);
        rea.status(500).json({ success: false, msg: "server error" });
    }
});