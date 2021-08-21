const mongoose = require('mongoose')

const userExerciseSchema = new mongoose.Schema({
  username: String,
  log: [{
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
  }],
  count: Number
})

const UserExercises = mongoose.model('userExercises', userExerciseSchema)

module.exports = { UserExercises }