import dotenv from 'dotenv';
import mysql from "mysql2/promise";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "airbnb",
});
const conn = await pool.getConnection();

export default conn;