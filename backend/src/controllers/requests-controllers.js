// app.get("api/:binId/requests", requestsControllers.getAllRequests);
// app.get("api/:requestId", requestsControllers.getRequestById);
// app.post("api/:binId", requestsControllers.createRequestRecord);

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

const getRequestsByBinId = (req, res) => {
  const binId = req.params.binId;

  pool.query(
    "SELECT * FROM requests WHERE bin = $1",
    [binId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getRequestById = (req, res) => {
  const requestId = req.params.requestId;

  pool.query(
    "SELECT * FROM requests WHERE id = $1",
    [requestId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createRequestRecord = (req, res) => {
  const binId = req.params.binId;
  const requestId = uuidv4();
  const date = new Date(); // should grab date from req headers

  // need to create a record in MongoDB here first

  pool.query(
    "INSERT INTO requests (uuid, createdat, method, headers, body, bin) VALUES ($1, $2, $3, $4, $5, $6)",
    [requestId, date, req.method, req.headers, "body", binId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).end();
    }
  );
};

module.exports = {
  getRequestsByBinId,
  getRequestById,
  createRequestRecord,
};
