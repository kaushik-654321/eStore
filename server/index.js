import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import './passportConfig.js'; // initialize strategies
import fruitRoutes from "./routes/fruitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import session from 'express-session';


console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "https://kaushik-654321.github.io", // Your frontend URL
]
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);
app.use(cookieParser());
app.use(session({
  name: 'connect.sid',
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,           // must be true for cross-origin HTTPS
    sameSite: 'none',       // required for cross-origin
  }
}));
app.use(passport.initialize());
app.use(passport.session());



// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api", userRoutes);
app.use("/fruits", fruitRoutes);
app.use("/category", categoryRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
