const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Connection = require("../config/database")

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
const connection = new Connection()

module.exports = connection.model("user", userSchema, "user")
