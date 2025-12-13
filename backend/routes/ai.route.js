import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/ai.controller.js";
import { aiRateLimiter } from "../middleware/AiRateLimiter.js";

const aiRouter = express.Router();

aiRouter.post(
  "/enhance-pro-summary",
  protectedRoute,
  aiRateLimiter,
  enhanceProfessionalSummary
);
aiRouter.post(
  "/enhance-job-description",
  protectedRoute,
  aiRateLimiter,
  enhanceJobDescription
);
aiRouter.post("/upload-resume", protectedRoute, aiRateLimiter, uploadResume);

export default aiRouter;
