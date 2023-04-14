const mongoose = require("../config/database")
const Schema = mongoose.Schema

const occurrenceSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  files: [
    {
      filename: String,
      filesize: Number,
    },
  ],
  type: {
    type: String,
    required: true,
    enum: ["session", "relevant_fact", "attachment", "assessment"],
  },
  assessments: {
    interview: {
      type: Schema.Types.ObjectId,
      ref: "assessment",
    },
    tests: {
      type: Schema.Types.ObjectId,
      ref: "assessment",
    },
    observation: {
      type: Schema.Types.ObjectId,
      ref: "assessment",
    },
  },

  payment: {
    value: {
      type: Number,
    },
    method: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("occurrence", occurrenceSchema, "occurrence")
