import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product.js";
import { User } from "./models/userModel.js";

import { Cart } from "./models/Cart.js";
import products from "./data/products.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const seedData = async() => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany()
        const createdAdmin = await User.create({
            name: "admin User",
            email: "admin@gmail.com",
            role: "admin",
            password: '1234',
        });

        const userId = createdAdmin._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userId };
        });

        const product = await Product.insertMany(sampleProducts);
        console.log("product data successifully added");
        process.exit();
    } catch (error) {
        console.log("error seeding the data", error);
        process.exit(1);
    }
};

seedData()