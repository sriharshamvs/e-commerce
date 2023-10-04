const { CREATE_USER_TABLE_QUERY } = require("../src/utils/queries");

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const migrate = async () => {
  try {
    await pool.query(CREATE_USER_TABLE_QUERY);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error.message);
  } finally {
    await pool.end();
  }
};

module.exports = migrate;
