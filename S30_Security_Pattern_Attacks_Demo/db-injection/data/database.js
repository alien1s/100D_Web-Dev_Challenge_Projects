require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //multipleStatements: true, this is not the default the default without wirte it down is false and that prevent multiple quries command ;&; and block the execution
});

module.exports = pool;
