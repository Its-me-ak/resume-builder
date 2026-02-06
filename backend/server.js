import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import path from "path";
import resumeRouter from "./routes/resume.route.js";
import aiRouter from "./routes/ai.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

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

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
