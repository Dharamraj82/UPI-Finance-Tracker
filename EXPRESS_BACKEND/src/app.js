import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Security
app.use(helmet());

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://upi-finance-tracker-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middlewares
app.use(compression());
// Custom IST timestamp token for morgan
morgan.token("ist-time", () => {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
});
app.use(morgan("[:ist-time IST] :method :url :status :response-time ms"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

import v1Routes from "./routes/v1/index.js";
app.use("/api/v1", v1Routes);

// Serve static files (so you can view uploaded files publicly)
app.use("/uploads", express.static("src/uploads"));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running successfully.",
  });
});

export default app;