const express = require("express")
const router = express.Router()
const Timeline = require("../models/Timeline")
const Occurrence = require("../models/Occurrence")

const checkToken = require("../middlewares/checkToken")

router.use(checkToken)

router.post("/", async (req, res) => {
  const { patientId, serviceName } = req.body

  try {
    const timeline = await Timeline.create({
      patientId,
      serviceName,
    })

    res.status(201).json({ timeline })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao criar a timeline" })
  }
})

router.get("/", async (req, res) => {
  try {
    const timelines = await Timeline.find()

    res.json({ timelines })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao buscar as timelines" })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const timeline = await Timeline.findById(id).populate("occurrences")

    if (!timeline) {
      return res.status(404).json({ message: "Timeline não encontrada" })
    }

    res.json({ timeline })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao buscar a timeline" })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { serviceName } = req.body

  try {
    const timeline = await Timeline.findByIdAndUpdate(
      id,
      {
        serviceName,
        modifiedOn: Date.now(),
      },
      { new: true }
    )

    if (!timeline) {
      return res.status(404).json({ message: "Timeline não encontrada" })
    }

    res.json({ timeline })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao atualizar a timeline" })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const timeline = await Timeline.findByIdAndDelete(id)

    if (!timeline) {
      return res.status(404).json({ message: "Timeline não encontrada" })
    }

    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao deletar a timeline" })
  }
})

router.delete("/:id/occurrence/:occurrenceId", async (req, res) => {
  const { id, occurrenceId } = req.params

  try {
    const timeline = await Timeline.findById(id)

    if (!timeline) {
      return res.status(404).json({ message: "Timeline não encontrada" })
    }

    timeline.occurrences.pull(occurrenceId)
    await timeline.save()

    await Occurrence.findByIdAndRemove(occurrenceId)
    res.status(200).json(timeline)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao deletar a timeline" })
  }
})

module.exports = router
