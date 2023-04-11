const mongoose = require("../config/database")

const assessmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  interview: [
    {
      abstract: {
        type: String,
      },
      textAnswer: {
        type: String,
      },
      optionAnswer: {
        type: String,
      },
    },
  ],
  tests: [
    {
      type: {
        type: String,
        required: true,
        enum: ["attention", "memory", "intelligence"],
      },
      name: {
        type: String,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
      percentile: {
        type: Number,
        required: true,
      },
      result: {
        type: String,
        required: true,
        enum: ["low", "average-low", "average", "average-high", "high"],
      },
      observation: {
        type: String,
      },
    },
  ],
  observation: {
    type: String,
  },
})

module.exports = mongoose.model("assessment", assessmentSchema)