require("dotenv").config();
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

app.get("/api/bins", binsControllers.getAllBins);
app.get("/api/bins/:binId", binsControllers.getBinById);
app.post("/api/bins", binsControllers.createBin);

app.get("/api/requests/bin/:binId", requestsControllers.getRequestsByBinId);
app.get("/api/requests/:requestId", requestsControllers.getRequestById);
app.post("/api/requests/:binId", requestsControllers.createRequestRecord);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.mbd9eeh.mongodb.net/panicbin?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5005);
    console.log(`Server listening on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
