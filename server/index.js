import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();


//middleware
app.use(cors());
app.use(express.json());

//Login
app.post("/login", async (req,res)=>{
    try{
        const {username, password} = req.body;
        const result = await pool.query("select * from login");
        const user = result.rows[0];
        const adminUsername = user.username;
        const adminPassword = user.password

        console.log(user);
        if(username===adminUsername && password===adminPassword){
            res.json({"Admin":"true"});
        }
        else{
            res.json({"Admin":"false"});
        }
    }
    catch(err){
        console.error(err.message);
    }
});

//Routes for CRUD
    

app.listen(5000,()=>{
    console.log("server is starting at port 5000");
});