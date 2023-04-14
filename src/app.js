const express = require("express")
const user = require("./routes/user")
const patient = require("./routes/patient")
const occurrence = require("./routes/occurrence")
const timeline = require("./routes/timeline")
const assessment = require("./routes/assessment")
const bodyParser = require("body-parser")
require("dotenv").config()
const checkKey = require("./middlewares/checkKey")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(checkKey)

app.use("/api/user", user)
app.use("/api/patient", patient)
app.use("/api/occurrence", occurrence)
app.use("/api/timeline", timeline)
app.use("/api/assessment", assessment)

app.get("/", (req, res) => {
  res.send("API working")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
