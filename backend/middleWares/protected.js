import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  const tokenHeaders = req.headers.authorization;

  //   console.log(tokenHeaders);
  if (!tokenHeaders || !tokenHeaders.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalide or No token provided" });
  }

  const to = tokenHeaders.split(" ")[1];
  const token = to.split('"')[1];
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId).select("-password");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, msg: "Not Authorised As Admin" });
  }
};
