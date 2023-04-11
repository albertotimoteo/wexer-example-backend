const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middlewares/auth")

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado." })
      }

      if (!auth.comparePassword(password, user.password)) {
        return res.status(401).json({ message: "Senha incorreta." })
      }

      const token = auth.generateToken(user)
      return res.json({ token })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(500)
        .json({ message: "Erro ao processar a requisição." })
    })
})

module.exports = router
