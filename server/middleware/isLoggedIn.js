// Middleware to check if the user is logged in
export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Not authenticated" });
};
