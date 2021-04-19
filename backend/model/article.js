let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let articleSchema = new Schema(
  {
    title: String,
    content: String,
    private: Boolean,
    author: String,
    category: String,
    thumbnail: String,
    prominent: Boolean,
    water: Number,
    comments: Array,
    view: Number,
    date: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("article", articleSchema);