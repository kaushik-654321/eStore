import express from 'express';
import {registeredUser, loginusers} from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post('/auth/login', loginusers);
userRoutes.post('/auth/signup', registeredUser);


export default userRoutes;