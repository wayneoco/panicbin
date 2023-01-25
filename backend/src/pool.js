const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "panicbin",
  password: "password",
  port: 5432,
});

module.exports = {
  pool,
};
