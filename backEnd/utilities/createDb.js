import pkg from "pg";
const { Client } = pkg;

class DATABASE {
  // Private static instance to store the single connection
  static instance = null;

  constructor() {
    // Check if an instance already exists; if so, return that instance
    if (DATABASE.instance) {
      return DATABASE.instance;
    }

    this.clientConfig = {
      host: "localhost",
      user: "postgres",
      password: "postgres",
      port: 5432,
    };

    this.mainClient = new Client(this.clientConfig); // Initial connection
    this.newDbConfig = { ...this.clientConfig, database: "raksha" }; // Reconnect to 'raksha'

    this.db = null;
    DATABASE.instance = this; // Set the singleton instance
  }

  // Initialize the database (create it if it doesn't exist, and connect)
  async initDB() {
    try {
      await this.mainClient.connect();
      console.log("Connected to PostgreSQL server.");

      const result = await this.mainClient.query(
        `SELECT 1 FROM pg_database WHERE datname = 'raksha';`,
      );
      if (result.rowCount === 0) {
        await this.mainClient.query(`CREATE DATABASE raksha;`);
        console.log("Successfully created database 'raksha'.");
      } else {
        console.log("Database 'raksha' already exists.");
      }

      await this.mainClient.end(); // Close the initial connection to create the database

      this.db = new Client(this.newDbConfig); // Connect to 'raksha' database
      await this.db.connect();
      console.log("Connected to 'raksha' database.");
    } catch (err) {
      console.error("Couldn't create or connect to database:", err.message);
    }
  }

  // Get the active connection
  getConnection() {
    return this.db;
  }
}

export default DATABASE;
