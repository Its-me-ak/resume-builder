import { Resume } from "../models/Resume.js";
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
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
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

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in registerUser:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({ message: "Login successfully", user: user });
  } catch (error) {
    console.log("Error in loginUser:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for logout user
export const logoutUser = async (req, res) => {
 try {
   res.clearCookie("JWT", {
     httpOnly: true,
     secure: process.env.NODE_ENV !== "development",
     sameSite: "strict",
     path: "/",
   });

   return res.status(200).json({ message: "Logout successfully" });
 } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server error" });
 }
};

// controller for getting user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user: user });
  } catch (error) {
    console.log("Error in getUserById:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for getting user Resume
// GET: /api/user/resumes
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId });

    return res
      .status(200)
      .json({ message: "Resume fetched successfully", resumes });
  } catch (error) {
    console.log("Error in getUserResume:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
