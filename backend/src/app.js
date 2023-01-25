const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const binsControllers = require("./controllers/bins-controllers");
const requestsControllers = require("./controllers/requests-controllers");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
  })
);

app.get("api/bins", binsControllers.getAllBins);
app.get("api/bins/:binId", binsControllers.getBinById);
app.post("api/bins", binsControllers.createBin);

app.get("api/:binId/requests", requestsControllers.getAllRequests);
app.get("api/:requestId", requestsControllers.getRequestById);
app.post("api/:binId", requestsControllers.createRequestRecord);
