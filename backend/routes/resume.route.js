import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resume.controller.js';
import upload from '../middleware/multer.js';

const resumeRouter = express.Router();

resumeRouter.post("/create", protectedRoute, createResume);
resumeRouter.put("/update", upload.single("image"), protectedRoute, updateResume);
resumeRouter.delete("/delete/:resumeId", protectedRoute, deleteResume);
resumeRouter.get("/get/:resumeId", protectedRoute, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;