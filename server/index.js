import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fruitRoutes from "./routes/fruitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "https://opulent-barnacle-qx7jjxjg7wvh9vp5-3000.app.github.dev", // Your frontend URL
  ]
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow cookies if needed
    })
  );

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Sample route
app.use("/fruits", fruitRoutes);
app.use("/category", categoryRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
