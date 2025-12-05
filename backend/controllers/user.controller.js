import { User } from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// controller for user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return apiError(res, 400, "Password must be at least 6 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiError(res, 400, "Invalid email format");
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    if (!newUser) {
      return res.status(500).json({ message: "User registration failed" });
    }

    generateTokenAndSetCookie(newUser._id, res);
    newUser.password = undefined;
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error in registerUser:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
