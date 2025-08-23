import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import memberRoutes from "./routes/member.routes.js";
import classRoutes from "./routes/class.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const origins = process.env.CLIENT_ORIGINS?.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || !origins || origins.includes(origin))
        return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.json({ status: "OK", service: "Fitness API" }));
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/workouts", workoutRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
