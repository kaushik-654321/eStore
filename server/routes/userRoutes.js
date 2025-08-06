import express from 'express';
import passport from 'passport';
import { registeredUser, loginusers, OauthUserLoggedIn, OauthUserLoggedOut } from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post('/auth/login', loginusers);
userRoutes.post('/auth/signup', registeredUser);
// Get logged-in user
userRoutes.get('/user', OauthUserLoggedIn);
// Logout Route
userRoutes.get('/auth/logout', OauthUserLoggedOut);

// Google Auth Route
userRoutes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google Auth Callback
userRoutes.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('https://kaushik-654321.github.io/eStore/');
});


export default userRoutes;