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
import './passportConfig.js'; // initialize strategies

console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

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

// // Sample route
// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email'],
// }));

// app.get('/auth/google/callback', passport.authenticate('google', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('https://opulent-barnacle-qx7jjxjg7wvh9vp5-3000.app.github.dev'); // redirect to React app
// });

// app.get('/api/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: 'Not logged in' });
//   }
// });

// app.get('/auth/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('http://localhost:3000');
//   });
// });
app.use("/fruits", fruitRoutes);
app.use("/category", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
