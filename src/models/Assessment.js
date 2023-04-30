const mongoose = require("mongoose")
const Connection = require("../config/database")

const assessmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["interview", "tests", "observation"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "done"],
  },
  interview: [
    {
      abstract: {
        type: String,
      },
      question: {
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

const connection = new Connection()

module.exports = connection.model("assessment", assessmentSchema, "assessment")
