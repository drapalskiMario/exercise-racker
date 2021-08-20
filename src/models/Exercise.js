const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: { type: Date, default: Date.now },
  userId: Schema.Types.ObjectId
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = { Exercise }