import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import User from '../models/User.js';
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await user.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.callbackURL}`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create the user
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
        avatar: profile.photos && profile.photos[0] && profile.photos[0].value
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// passport.use(new GoogleStrategy({
//   clientID:process.env.GOOGLE_CLIENT_ID,
//   clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL:process.env.callbackURL,
// }, async(accessToken, refreshToken, profile, done) => {
//   // In real app, you'd save user to DB here
//   return done(null, profile);
// }));

