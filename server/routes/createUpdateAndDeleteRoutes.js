import pool from "../db.js";
export const createUpdateAndDeleteRoutes=(app,isLoggedIn)=>{

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
};