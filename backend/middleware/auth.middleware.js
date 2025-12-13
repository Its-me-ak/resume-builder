import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
