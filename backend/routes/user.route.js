import express from 'express';
import { getUserById, loginUser, registerUser } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protectedRoute, getUserById)

export default userRouter;