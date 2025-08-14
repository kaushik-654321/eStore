import express from 'express';
import passport from 'passport';
import jwt from "jsonwebtoken";
import { registeredUser, loginusers, OauthUserLoggedIn, OauthUserLoggedOut } from '../controllers/authController.js';
import User from '../models/User.js'; // Assuming you have a User model defined
const userRoutes = express.Router();

userRoutes.get("/auth/google", (req, res) => {
    const redirect_uri = "https://estore-production-4c0c.up.railway.app/api/auth/google/callback";
    const scope = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid"
    ].join(" ");

    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri,
        response_type: "code",
        scope,
        access_type: "offline",
        prompt: "consent"
    });

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

userRoutes.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: "https://estore-production-4c0c.up.railway.app/api/auth/google/callback",
            grant_type: "authorization_code"
        })
    });

    const tokens = await tokenRes.json();

    // Fetch user info
    const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const payload = await userRes.json();
    const googleId = payload.sub;
    if (!googleId) {
        return res.status(400).json({ error: "Invalid Google payload" });
    }
    let user = await User.findOne({ googleId });
    if (!user) {
         user = await User.findOne({ email: payload.email });
         if (user) {
                // Link existing account to Google
                user.googleId = googleId;
                user.picture = payload.picture;
                await user.save();
            } else {
                // Create new Google user
                user = await User.create({
                    fullName: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    googleId: googleId
                });
            }
    }
    
    const tempToken = jwt.sign(user, 'kau12', { expiresIn: "1m" });

    // Redirect to frontend
    res.redirect(`https://kaushik-654321.github.io/eStore?token=${tempToken}`);
});

userRoutes.post("/user", (req, res) => {
    const decodedUser = jwt.verify(req.body.token, 'kau12');
    req.session.user = decodedUser;
    console.log("Session set for user:", decodedUser);
    res.json({ message: "Session set" });

});

// userRoutes.post('/auth/login', loginusers);
// userRoutes.post('/auth/signup', registeredUser);
// userRoutes.post("/auth/google", OauthUserLoggedIn)
// userRoutes.post("/auth/logout", OauthUserLoggedOut)

export default userRoutes;