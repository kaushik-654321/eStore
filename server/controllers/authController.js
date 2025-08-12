import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registeredUser = async (req, res) => {
    try {
        const { name: fullName, email, mobile, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'user already exists' });
        const user = await User.create({ fullName, email, mobile, password });
        if (user) {
            return res.status(201).json({ name: user.fullName, email: user.email, userId: user.id, message: 'User registered successfully' });
        }
        else {
            return res.status(400).json({ message: 'Invalid user Data' })
        }
    }
    catch (error) { res.status(500).json({ message: 'Server Error', error }) };
}

export const loginusers = async (req, res) => {
    try {
        const { email, password, } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid login credentials' })
        }
        const token = generateToken(user._id);
        // res.cookie('token', token, {
        //     httpOnly: false,
        //     secure: false,
        //     sameSite: 'None',
        //     domain: '.app.github.dev',
        //     maxAge: 24 * 60 * 60 * 1000 //1day
        // })
        return res.status(200).json({ token, name: user.fullName, email: user.email, userId: user.id, message: 'Login Successfull' })

    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

export const OauthUserLoggedIn = async (req, res) => {

    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ error: "Token missing" });

        // Verify ID token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // Check if user exists in DB
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = await User.create({
                fullName: payload.name,
                email: payload.email,
                picture: payload.picture,
            });
        }

        // Create session
        req.session.userId = user._id;
        console.log("User logged in:", user.fullName);
        return res.status(200).json({ token, name: user.name, email: user.email, userId: user._id, message: 'Login Successfull' })

    } catch (error) {
        console.error("Google auth error:", error);
        res.status(401).json({ error: "Invalid Google token" });
    }
}


export const OauthUserLoggedOut = async (req, res) => {
    req.logout(() => {
        res.redirect('https://estore91.netlify.app');
    });
}

