import express from 'express';
import { getUserById, getUserResume, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser);
userRouter.get("/data", protectedRoute, getUserById)
userRouter.get("/resumes", protectedRoute, getUserResume);


export default userRouter;