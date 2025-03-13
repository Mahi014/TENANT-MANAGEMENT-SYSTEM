import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();


//middleware
app.use(cors());
app.use(express.json());

//Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query("select * from login");
        const user = result.rows[0];
        const adminUsername = user.username;
        const adminPassword = user.password
        if (username === adminUsername && password === adminPassword) {
            res.json({ "Admin": "true" });
        }
        else {
            res.json({ "Admin": "false" });
        }
    }
    catch (err) {
        console.error(err.message);
    }
});

//Routes for CRUD
// Get all tenants or search by name, aadhar, or room_no
app.get("/view", async (req, res) => {
    try {
        const { search } = req.query;

        let query = "SELECT * FROM tenant ORDER BY room_no ASC";
        let values = [];

        if (search) {
            query = `SELECT * FROM tenant WHERE 
                     name ILIKE $1 OR 
                     aadhar::TEXT ILIKE $1 OR 
                     room_no::TEXT ILIKE $1 
                     ORDER BY room_no ASC`;
            values = [`%${search}%`]; 
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});


//Create a tenant
app.post("/create", async (req, res) => {
    try {
        const { aadhar, name, gender, phone_num, address, room_no, rent, rent_paid } = req.body;
        const newTenant = await pool.query("INSERT INTO tenant (aadhar, name, gender, phone_num, address, room_no, rent, rent_paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [aadhar, name, gender, phone_num, address, room_no, rent, rent_paid]
        );
        res.json({ "Success": "true" });
    }
    catch (err) {
        res.json({ "Success": "false" });
        console.error(err.message);
    }
});

//update a tenant
app.put("/update/:id", async (req, res) => {
    try {
        const { nameState, genderState, phone_numState, addressState, room_noState, rentState, rent_paidState } = req.body;
        const { id } = req.params;
        const tenantUpdate = await pool.query(
            `UPDATE tenant 
                 SET name = $1, 
                     gender = $2, 
                     phone_num = $3, 
                     address = $4, 
                     room_no = $5, 
                     rent = $6, 
                     rent_paid = $7 
                 WHERE aadhar = $8`,
            [nameState, genderState, phone_numState, addressState, room_noState, rentState, rent_paidState, id]
        );
        res.json({ "Success": "true" });
    }
    catch (err) {
        res.json({ "Success": "false" });
        console.error(err.message);
    }
});
//delete a tenant
app.delete("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await pool.query("Delete From tenant WHERE aadhar=$1", [id]);
        res.json("Delete sucessful");
    }
    catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("server is starting at port 5000");
});