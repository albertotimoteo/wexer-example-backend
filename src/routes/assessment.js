const express = require("express")
const router = express.Router()
const Assessment = require("../models/Assessment")
const checkToken = require("../middlewares/checkToken")

router.use(checkToken)

router.get("/assessments/:id", async (req, res) => {
  const id = req.params.id
  try {
    const assessment = await Assessment.findById(id)
    res.status(200).send(assessment)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.put("/assessments/:id", async (req, res) => {
  const id = req.params.id
  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).send(updatedAssessment)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

module.exports = router
