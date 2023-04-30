const mongoose = require("mongoose")
const { Schema } = mongoose
const Connection = require("../config/database")

const patientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  profession: { type: String },
  schooling: { type: String, enum: ["Fundamental", "Médio", "Superior"] },
  demands: { type: String },
  personalAnnotations: { type: String },
})

const connection = new Connection()

module.exports = connection.model("patient", patientSchema, "patient")
