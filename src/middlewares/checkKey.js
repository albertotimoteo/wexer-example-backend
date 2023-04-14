require("dotenv").config()

function checkKey(req, res, next) {
  const key = req.headers["x-api-key"]

  if (!key) {
    return res.status(401).json({ message: "API Key não encontrada" })
  }

  if (key !== process.env.API_KEY) {
    return res.status(401).json({ message: "API Key inválida" })
  }

  next()
}

module.exports = checkKey
