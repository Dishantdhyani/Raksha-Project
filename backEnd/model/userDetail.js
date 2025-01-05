// Create a new user and their details
const createUser = async (
  id,
  email,
  password,
  phone_num,
  first_name,
  last_name,
  admin,
  db,
  callback,
) => {
  const sqlLogin = `
        INSERT INTO raksha.login (email, password) 
        VALUES ($1, $2) 
        RETURNING *;`;

  const sqlUserDetail = `
        INSERT INTO raksha.user_detail (id, email, phone_num, first_name, last_name, admin) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *;`;

  try {
    // Insert into LOGIN table
    const resultLogin = await db.query(sqlLogin, [email, password]);

    // If user creation was successful, create their details
    if (resultLogin.rows[0]) {
      const resultUserDetail = await db.query(sqlUserDetail, [
        id,
        email,
        phone_num,
        first_name,
        last_name,
        admin,
      ]);
      callback(resultUserDetail.rows[0]); // Return the inserted user details
    } else {
      callback(null);
    }
  } catch (err) {
    console.error("Error creating user:", err.message);
    callback(null);
  }
};

// Get user details by email
const getUser = async (email, db, callback) => {
  const sql = "SELECT * FROM raksha.user_detail WHERE email = $1;";
  try {
    const result = await db.query(sql, [email]);
    callback(result.rows[0] || null); // Return the user details or null if not found
  } catch (err) {
    console.error("Error fetching user details:", err.message);
    callback(null);
  }
};

export { createUser, getUser };
