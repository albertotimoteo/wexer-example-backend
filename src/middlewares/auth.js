const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400, // tempo de expiração do token, em segundos
    }
  )
}

const comparePassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

module.exports = {
  generateToken,
  comparePassword,
}
