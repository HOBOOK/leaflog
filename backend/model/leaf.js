let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let leafSchema = new Schema(
  {
    id: String,
    leafs: Array,
    date: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("leaf", leafSchema);