import express from "express";
import cors from "cors";
import passport from "passport";
import pool from "./db.js";
import { googleAuthRoutes } from "./googleAuth.js";
import { sessionMiddleware } from "./sessionMiddleware.js";

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

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Not authenticated" });
};

app.get("/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});


// Routes for CRUD operations
app.get("/view", isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.user_id; 

        let query = "SELECT * FROM tenant WHERE owner_id = $1 ORDER BY room_no ASC";
        let values = [userId]; 

        const { search } = req.query;

        if (search) {
            query = `SELECT * FROM tenant WHERE 
                     owner_id = $1 AND 
                     (name ILIKE $2 OR 
                      aadhar::TEXT ILIKE $2 OR 
                      room_no::TEXT ILIKE $2)
                     ORDER BY room_no ASC`;
            values = [userId, `%${search}%`];  
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});


// Create a tenant
app.post("/create", isLoggedIn, async (req, res) => {
    try {
        const { aadhar, name, gender, phone_num, address, room_no, rent, rent_paid } = req.body;
        const owner_id = req.user.user_id; 

        await pool.query(
            "INSERT INTO tenant (aadhar, name, gender, phone_num, address, room_no, rent, rent_paid, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [aadhar, name, gender, phone_num, address, room_no, rent, rent_paid, owner_id]
        );
        res.json({ "Success": "true" });
    } catch (err) {
        res.json({ "Success": "false" });
        console.error(err.message);
    }
});

// Update a tenant
app.put("/update/:id", isLoggedIn, async (req, res) => {
    try {
        const { nameState, genderState, phone_numState, addressState, room_noState, rentState, rent_paidState } = req.body;
        const { id } = req.params;
        const owner_id = req.user.user_id;

        await pool.query(
            `UPDATE tenant SET name = $1, gender = $2, phone_num = $3, address = $4, room_no = $5, rent = $6, rent_paid = $7 WHERE aadhar = $8 AND owner_id = $9`,
            [nameState, genderState, phone_numState, addressState, room_noState, rentState, rent_paidState, id,owner_id]
        );
        res.json({ "Success": "true" });
    } catch (err) {
        res.json({ "Success": "false" });
        console.error(err.message);
    }
});

// Delete a tenant
app.delete("/view/:id", isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM tenant WHERE aadhar=$1", [id]);
        res.json("Delete successful");
    } catch (err) {
        console.log(err.message);
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
