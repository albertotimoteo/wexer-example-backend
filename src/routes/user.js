const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middlewares/auth")
const checkToken = require("../middlewares/checkToken")
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." })
    }

    if (!auth.comparePassword(password, user.password)) {
      return res.status(401).json({ message: "Senha incorreta." })
    }

    const token = auth.generateToken(user)
    return res.json({ token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro ao processar a requisição." })
  }
})

router.post("/", async (req, res) => {
  try {
    const { email, password, name } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.create({ email, password: encryptedPassword, name })
    res.status(201).json({ message: "Created" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Erro ao processar a requisição." })
  }
})

router.use(checkToken)

router.get("/", async (req, res) => {
  const { authorization } = req.headers

  jwt.verify(authorization, process.env.JWT_SECRET, (_, decoded) => {
    res.status(200).json(decoded)
  })
})

router.put("/", async (req, res) => {
  const { userId } = req
  console.log(userId)
  const { name, email, password } = req.body

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.password = password ? await bcrypt.hash(password, 10) : user.password

    await user.save()

    return res.status(200).json({ message: "Usuário atualizado com sucesso" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Erro ao atualizar o usuário" })
  }
})

module.exports = router
