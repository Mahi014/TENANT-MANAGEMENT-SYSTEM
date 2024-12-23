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

//get all tenant
app.get("/view", async (req, res) => {
    try {
        const allTenant = await pool.query("SELECT * FROM tenant");
        res.json(allTenant.rows)
    }
    catch (err) {
        console.error(err.message);
    }
});

//get a tenant
app.get("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tenant = await pool.query("SELECT * FROM tenant WHERE aadhar=$1", [id]);
        res.json(tenant.roes[0]);
    }
    catch (err) {
        console.log(err.message);
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
        const { name, gender, phone_num, address, room_no, rent, rent_paid } = req.body;
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
            [name, gender, phone_num, address, room_no, rent, rent_paid, id]
        )
    }
    catch (err) {
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