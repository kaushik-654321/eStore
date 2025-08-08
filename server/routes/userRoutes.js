import express from 'express';
import passport from 'passport';
import { registeredUser, loginusers, OauthUserLoggedIn, OauthUserLoggedOut } from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post('/auth/login', loginusers);
userRoutes.post('/auth/signup', registeredUser);
// Get logged-in user
userRoutes.get('/user', (req, res)=>{
  console.log("User route hit", req.user);
});
// Logout Route
userRoutes.get('/auth/logout', OauthUserLoggedOut);

// Google Auth Route
userRoutes.get('/auth/google', (req, res, next) => {
  console.log("Google Auth Route Hit");
  next()
}, passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google Auth Callback
userRoutes.get('/auth/google/callback', (req, res, next) => {
  console.log("Callback hit");
  next()
}, passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  console.log("Authenticated user:", req.user);
  res.redirect('https://estore91.netlify.app');
});


export default userRoutes;