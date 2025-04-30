import pool from "../db.js";
export const viewAndSearchRoutes=(app,isLoggedIn)=>{
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
    })
};
