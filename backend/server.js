import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { checkoutRouter } from "./routes/checkoutRoutes.js";
import { orderRoute } from "./routes/orderRoute.js";
import { subscriberRoute } from "./routes/subscriberRoute.js";
import { adminProductRoute } from "./routes/adminProductRoute.js";
import { adminOrderRoute } from "./routes/adminOrderRoute.js";
import { uploadRoute } from "./routes/uploadRoute.js";
import { adminUsersRoute } from "./routes/adminUserRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send(`<h1>Server running on port ${PORT}</h1>`);
});
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/admin/users", adminUsersRoute);
app.use("/api/admin/product", adminProductRoute);
app.use("/api/admin/orders", adminOrderRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 14:39:51`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
