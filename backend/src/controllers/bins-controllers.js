require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const getAllBins = (req, res) => {
  pool.query("SELECT * FROM bins ORDER BY createdAt DESC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getBinById = (req, res) => {
  const binId = req.params.binId;

  pool.query(
    "SELECT * FROM bins WHERE uuid = $1",
    [binId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createBin = (req, res) => {
  const id = uuidv4();
  const date = new Date().toUTCString();

  pool.query(
    "INSERT INTO bins (uuid, createdAt) VALUES ($1, $2) RETURNING *",
    [id, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

module.exports = {
  getAllBins,
  getBinById,
  createBin,
};
