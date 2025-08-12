import express from 'express';
import passport from 'passport';

import { registeredUser, loginusers, OauthUserLoggedIn, OauthUserLoggedOut } from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post('/auth/login', loginusers);
userRoutes.post('/auth/signup', registeredUser);
userRoutes.post("/auth/google", OauthUserLoggedIn)
userRoutes.post("/auth/logout", OauthUserLoggedOut)

export default userRoutes;