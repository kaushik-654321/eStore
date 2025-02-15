import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js"; 
import fruitRoutes from "./routes/fruitRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "https://fantastic-disco-x457747qvww2p5vp-3000.app.github.dev", // Your frontend URL
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
app.use("/fruits", fruitRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
