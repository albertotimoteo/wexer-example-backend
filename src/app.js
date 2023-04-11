const express = require("express")
const user = require("./routes/user")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", user)

app.get("/", (req, res) => {
  res.send("API working")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
