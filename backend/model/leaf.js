let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let leafSchema = new Schema(
  {
    id: String,
    root: Array,
    keyIndexes: Array,
    date: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("leaf", leafSchema);