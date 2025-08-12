import express from 'express';
import passport from 'passport';

import { registeredUser, loginusers, OauthUserLoggedIn, OauthUserLoggedOut } from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post("/auth/google", OauthUserLoggedIn)

export default userRoutes;