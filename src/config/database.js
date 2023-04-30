const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGODB_URI

class Connection {
  constructor() {
    if (!Connection.instance) {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      Connection.instance = mongoose.connection
    }
    return Connection.instance
  }
}

module.exports = Connection
