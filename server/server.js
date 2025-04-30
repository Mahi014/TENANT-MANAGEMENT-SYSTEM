import express from "express";
import cors from "cors";
import passport from "passport";
import { googleAuthRoutes } from "./googleAuth.js";
import { sessionMiddleware } from "./sessionMiddleware.js";
import {isLoggedIn} from "./middleware/isLoggedIn.js";
import { authRoutes } from "./routes/authRoutes.js";
import { logoutRoutes } from "./routes/logoutRoutes.js";
import { createUpdateAndDeleteRoutes } from "./routes/createUpdateandDeleteRoutes.js";
import {viewAndSearchRoutes} from "./routes/viewAndSearchRoutes.js";

const app = express();

// Middleware Setup
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);   
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
googleAuthRoutes(app);
authRoutes(app);
logoutRoutes(app);
createUpdateAndDeleteRoutes(app,isLoggedIn);
viewAndSearchRoutes(app,isLoggedIn);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
