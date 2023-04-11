const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGODB_URI
const dbName = "wexer-prontuario"

mongoose
  .connect(`${uri}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting MongoDB:", err))

module.exports = mongoose
