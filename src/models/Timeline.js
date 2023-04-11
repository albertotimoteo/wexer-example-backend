const mongoose = require("../config/database")

const { Schema } = mongoose

const timelineSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  occurrences: [
    {
      type: Schema.Types.ObjectId,
      ref: "Occurrence",
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("timeline", timelineSchema)
