let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let leafSchema = new Schema(
  {
    id: String,
    root: { type:Array, default: []},
    keyIndexes: { type:Array, default: []},
    date: { type: Date, default: Date.now },
    deleteDate: Date,
    email: String
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("leaf", leafSchema);