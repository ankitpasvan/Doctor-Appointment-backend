import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    // Step 1: Token header me hai ya nahi
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Step 2: Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: User find karo
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Request me user attach karo
    req.user = user;

    // Step 5: Next middleware ya controller ko bhej do
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
