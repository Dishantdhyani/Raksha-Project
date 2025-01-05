// Create emergency detail
const createEmergencyDetail = async (id, email, emergency_name, emergency_email, emergency_phone_num, db, callback) => {
    const sql = `
        INSERT INTO raksha.user_emergency (id, email, emergency_name, emergency_email, emergency_phone_num) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *;`;
    
    try {
        const result = await db.query(sql, [id, email, emergency_name, emergency_email, emergency_phone_num]);
        callback(result.rows[0]);  // Return the inserted emergency details
    } catch (err) {
        console.error("Error creating emergency details:", err.message);
        callback(null);
    }
};

// Get emergency contact by email
const getEmergencyDetail = async (email, db, callback) => {
    const sql = "SELECT * FROM raksha.user_emergency WHERE email = $1;";
    try {
        const result = await db.query(sql, [email]);
        callback(result.rows[0] || null);  // Return the emergency details or null if not found
    } catch (err) {
        console.error("Error fetching emergency details:", err.message);
        callback(null);
    }
};

// Export functions
export { createEmergencyDetail, getEmergencyDetail };
