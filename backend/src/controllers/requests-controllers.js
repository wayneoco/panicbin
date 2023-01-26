require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Pool = require("pg").Pool;
const mongoose = require("mongoose");
const Payload = require("../models/payload");

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
    "SELECT * FROM requests WHERE bin = $1 ORDER BY createdAt DESC",
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

  let payloadId;
  pool.query(
    "SELECT * FROM requests WHERE uuid = $1",
    [requestId],
    async (error, results) => {
      if (error) {
        throw error;
      }
      payloadId = results.rows[0].body;
      const payload = await Payload.findById(payloadId);
      results.rows[0].body = payload.payload;
      res.status(200).json(results.rows[0]);
    }
  );
};

const createRequestRecord = async (req, res) => {
  const binId = req.params.binId;
  const requestId = uuidv4();
  const date = new Date().toUTCString();

  const createdPayload = new Payload({
    payload: req.body,
  });

  let payloadId;
  try {
    await createdPayload.save().then((payload) => {
      payloadId = payload._id.toString();
    });
  } catch (err) {
    throw err;
  }

  pool.query(
    "INSERT INTO requests (uuid, createdat, method, headers, body, bin) VALUES ($1, $2, $3, $4, $5, $6)",
    [requestId, date, req.method, req.headers, payloadId, binId],
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

// let payLoadId = await controllers.insertPayload(reqObj);
// async function insertPayload(data) {
//   try {
//     const Payload = mongoose.model("Payload", payloadSchema);
//     const payload = new Payload({ payload: data });
//     await payload.save();
//     console.log("Payload saved to database");
//     return payload._id;
//   } catch (error) {
//     console.error(error);
//   }
// }
