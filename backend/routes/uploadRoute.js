import express from "express";
import dotenv from "dotenv/config";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
export const uploadRoute = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage({});

const upload = multer({ storage });

// uploadimage
uploadRoute.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "No file to upload" });
    }
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    const result = await streamUpload(req.file.buffer);
    if (result) {
      res.status(201).json({ success: true, imageUrl: result.secure_url });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server Eroor" });
  }
});
