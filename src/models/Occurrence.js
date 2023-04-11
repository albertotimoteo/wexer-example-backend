const mongoose = require("../config/database")
const Schema = mongoose.Schema

const occurrenceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  files: [
    {
      filename: String,
    },
  ],
  type: {
    type: String,
    required: true,
  },
  assessment: {
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
    },
  },
  payment: {
    value: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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

module.exports = mongoose.model("occurrence", occurrenceSchema)
