export const logoutRoutes=(app,isLoggedIn)=>{
   // Logout Route
    app.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) return next(err);
            res.json({ success: true });
        });
    });
};