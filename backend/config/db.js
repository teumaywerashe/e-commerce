import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected succesifully");
    } catch (error) {
        console.ERROR("DB connection failed ", error);
        process.exit(1);
    }
};