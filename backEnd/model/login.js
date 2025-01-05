// Check if user exists
const doesUserExist = async (email, db, callback) => {
  const sql = "SELECT * FROM raksha.login WHERE email = $1;";

  try {
    const result = await db.query(sql, [email]);
    if (result.rows.length > 0) {
      callback(true); // User exists
    } else {
      callback(false); // User does not exist
    }
  } catch (err) {
    console.error("Error checking if user exists:", err.message);
    callback(false); // Return false in case of error
  }
};

// Validate user credentials
const validateUser = async (email, password, db, callback) => {
  const sql = "SELECT * FROM raksha.login WHERE email = $1 AND password = $2;";
  try {
    const result = await db.query(sql, [email, password]);
    callback(result.rows[0] || null); // Use result.rows[0] to access the first row
  } catch (err) {
    console.error("Error validating user:", err.message);
    callback(null);
  }
};

// Get user details by email
const getUser = async (email, db, callback) => {
  const sql = "SELECT * FROM raksha.login WHERE email = $1;";
  try {
    const result = await db.query(sql, [email]);
    callback(result.rows[0] || null); // Return the user or null if not found
  } catch (err) {
    console.error("Error fetching user:", err.message);
    callback(null);
  }
};

// Update user's password
const updatePassword = async (password, email, db, callback) => {
  const sql =
    "UPDATE raksha.login SET password = $1 WHERE email = $2 RETURNING *;";
  try {
    const result = await db.query(sql, [password, email]);
    callback(result.rows[0] || null); // Return updated user or null if not found
  } catch (err) {
    console.error("Error updating password:", err.message);
    callback(null);
  }
};

export { doesUserExist, validateUser, getUser, updatePassword };
