let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("post", postSchema);