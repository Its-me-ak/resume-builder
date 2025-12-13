import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 100, 
  message: {
    message: "Daily AI usage limit reached. Try again tomorrow.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
