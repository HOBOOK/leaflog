let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    id: String,
    email: String,
    name: String,
    passwrod: String,
    subscribes: Array,
    avatar: String,
    introduction: String,
    regDate: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("user", userSchema);