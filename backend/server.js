import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import aiRouter from "./routes/ai.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
await connectDatabase();

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
