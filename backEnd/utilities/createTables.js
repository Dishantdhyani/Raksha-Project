class TABLES {
  constructor(db) {
    this.db = db;

    this.schemaCreation = `CREATE SCHEMA IF NOT EXISTS raksha;`;

    this.sql = {
      login: `
                CREATE TABLE IF NOT EXISTS raksha.LOGIN (
                    email VARCHAR(255) PRIMARY KEY,
                    password VARCHAR(255) NOT NULL
                )`,
      userDetail: `
                CREATE TABLE IF NOT EXISTS raksha.USER_DETAIL (
                    id VARCHAR(255) PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    phone_num VARCHAR(12) NOT NULL,
                    admin BOOLEAN DEFAULT false,
                    FOREIGN KEY(email) REFERENCES raksha.LOGIN(email)
                )`,
      userEmergency: `
                CREATE TABLE IF NOT EXISTS raksha.USER_EMERGENCY (
                    id VARCHAR(255) PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    emergency_name VARCHAR(255) NOT NULL,
                    emergency_phone_num VARCHAR(12) NOT NULL,
                    emergency_email VARCHAR(255) NOT NULL,
                    FOREIGN KEY(email) REFERENCES raksha.LOGIN(email)
                )`,
    };
  }

  async initTable() {
    try {
      await this.db.query(this.schemaCreation);
      console.log(`Schema 'raksha' ensured.`);
    } catch (err) {
      console.error(`Couldn't create schema 'raksha':`, err.message);
    }

    for (let tableName in this.sql) {
      try {
        await this.db.query(this.sql[tableName]);
        console.log(`Successfully created table ${tableName}`);
      } catch (err) {
        console.error(`Couldn't create table ${tableName}:`, err.message);
      }
    }
  }
}

export default TABLES;
