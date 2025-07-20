import mysql from "mysql2";

const conn = mysql.createPool({
  host: "127.0.0.1",
  user: process.env.DB_CONN_USER,
  password: process.env.DB_CONN_PASSWORD,
  database: process.env.DB_CONN_DATABASE,
});

export default conn;
