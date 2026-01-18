import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoute.js";
import { cartRouter } from "./routes/cartRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
const PORT = process.env.PORT || 3000;
const startServer = async() => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer();



// 10:23:19