import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

// Google OAuth Setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    
    const email = profile._json.email; 
    const id = profile.id;

    // Check if the user exists in the database
    const result = await pool.query("SELECT * FROM users WHERE google_id = $1", [id]);
    
    if (result.rows.length === 0) {
        // If not, create a new user
        await pool.query("INSERT INTO users (email, google_id) VALUES ($1, $2)", [email, id]);
    }

    return done(null, { email, google_id: id });
}));

passport.serializeUser((user, done) => {
    done(null, user.email); 
});

passport.deserializeUser(async (email, done) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    done(null, result.rows[0]);
});

// Google OAuth Routes
export const googleAuthRoutes = (app) => {
    // Initiate Google OAuth login
    app.get("/auth/google", passport.authenticate("google", {
        scope: ["email"]
    }));

    // Callback route where Google will send the user after authentication
    app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000" }), (req, res) => {
        res.redirect("http://localhost:3000/admin-dashboard"); 
    });

    // Logout Route
    app.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) return next(err);
            res.json({ success: true });
        });
    });
};