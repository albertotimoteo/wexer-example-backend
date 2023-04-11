const mongoose = require("../config/database")
const { Schema } = mongoose

const patientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  profession: { type: String },
  schooling: { type: String, enum: ["Fundamental", "Médio", "Superior"] },
  demands: { type: String },
  personalAnnotations: { type: String },
})

module.exports = mongoose.model("patient", patientSchema)
