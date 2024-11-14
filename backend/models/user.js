const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  nickName: String,
  email: String,
  adress: String,
  password: String,
  token: String
  })

const User = mongoose.model("users", userSchema)

module.exports = User