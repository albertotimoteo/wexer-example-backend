const express = require("express")
const router = express.Router()
const Occurrence = require("../models/Occurrence")
const Timeline = require("../models/Timeline")
const Assessment = require("../models/Assessment")
const checkToken = require("../middlewares/checkToken")

router.use(checkToken)

router.post("/", async (req, res) => {
  const { title, content, files, type, payment, timelineId } = req.body
  const timeline = await Timeline.findById(timelineId)
  if (!timeline) {
    res.status(400).json({
      message: "O id de timeline fornecido não foi encontrado na base de dados",
    })
  }
  const assessments = {}
  if (type === "assessment") {
    const interview = await new Assessment({
      type: "interview",
      status: "pending",
    }).save()
    assessments.interview = interview._id

    const tests = await new Assessment({
      type: "tests",
      status: "pending",
    }).save()
    assessments.tests = tests._id

    const observation = await new Assessment({
      type: "observation",
      status: "pending",
    }).save()
    assessments.observation = observation._id
  }

  const occurrence = new Occurrence({
    title,
    content,
    files,
    type,
    assessments,
    payment,
  })

  try {
    const newOccurrence = await occurrence.save()
    await Timeline.updateOne(
      { _id: timeline._id },
      { occurrences: [...timeline.occurrences, newOccurrence._id] }
    )
    const updatedTimeline = await Timeline.findById(timelineId).populate(
      "occurrences"
    )
    res.status(201).json(updatedTimeline)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put("/:id", async (req, res) => {
  const { title, content, files, type, assessment, payment } = req.body
  const { id } = req.params

  try {
    const updatedOccurrence = await Occurrence.findByIdAndUpdate(
      id,
      {
        title,
        content,
        files,
        type,
        assessment,
        payment,
        modifiedOn: Date.now(),
      },
      { new: true }
    )

    if (!updatedOccurrence) {
      return res.status(404).json({ message: "Ocorrência não encontrada." })
    }

    return res.json(updatedOccurrence)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro ao atualizar a ocorrência." })
  }
})

module.exports = router
