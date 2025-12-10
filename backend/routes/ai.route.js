import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from '../controllers/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-summary', protectedRoute, enhanceProfessionalSummary);
aiRouter.post(
  "/enhance-job-description",
  protectedRoute,
  enhanceJobDescription
);
aiRouter.post("/upload-resume", protectedRoute, uploadResume);

export default aiRouter;