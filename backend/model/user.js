let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    id: String,
    email: String,
    authType: String,
    token: {type:String, default: ''},
    name: String,
    password: String,
    subscribes: {type:Array, default: []},
    avatar: {type:String, default: ''},
    introduction: {type:String, default: ''},
    regDate: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("user", userSchema);