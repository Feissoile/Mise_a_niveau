const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  nickname: String,
  email: String,
  adress: String,
  password: String,
  token: String,
  islog: Boolean
  })

const User = mongoose.model("users", userSchema)

module.exports = User