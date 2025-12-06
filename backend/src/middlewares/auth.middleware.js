import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
};
