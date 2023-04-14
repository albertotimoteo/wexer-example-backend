const express = require("express")
const router = express.Router()
const Patient = require("../models/Patient")
const checkToken = require("../middlewares/checkToken")

router.use(checkToken)

router.post("/", async (req, res) => {
  try {
    const { userId } = req
    const {
      name,
      profession,
      schooling,
      demands,
      personalAnnotations,
      birthdate,
    } = req.body
    const patient = new Patient({
      userId,
      name,
      profession,
      schooling,
      demands,
      personalAnnotations,
      birthdate,
    })
    await patient.save()
    res.status(201).json(patient)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params
    const patient = await Patient.findById(id.id)
    res.status(200).json(patient)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Erro ao buscar paciente." })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { name, profession, schooling, demands, personalAnnotations } =
      req.body
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, profession, schooling, demands, personalAnnotations },
      { new: true }
    )
    res.status(200).json(patient)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

module.exports = router
