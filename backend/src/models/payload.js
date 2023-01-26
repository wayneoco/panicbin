const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const payloadSchema = new Schema({
  payload: {},
});

module.exports = mongoose.model("Payload", payloadSchema);
