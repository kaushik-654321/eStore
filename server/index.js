import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fruitRoutes from "./routes/fruitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import session from 'express-session';
const app = express();
app.use(express.json());
app.use(cookieParser());
// Middleware
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
app.set("trust proxy", 1);
app.use(session({
  name: "session",
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",  // Required for cross-site cookies
  secure: true       // Required because Railway uses HTTPS
}));
// app.use(session({
//   secret: 'your-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: true,       // HTTPS only (Netlify & Railway are both HTTPS)
//     sameSite: 'none',   // Allow cross-site cookies
//     httpOnly: true      // Security: prevent JS access
//   }

// }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", userRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/fruits", fruitRoutes);
app.use("/category", categoryRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
