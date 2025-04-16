import express from 'express';
import {registeredUser, loginusers} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginusers);
router.post('/signup', registeredUser);


export default router;