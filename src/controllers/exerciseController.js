const { Exercise } = require("../models/Exercise")
const { User } = require("../models/User")

const createExercise = async (req, res) => {
  try {
    const { description, duration, date } = req.body
    const { _id } = req.params

    const exerciseObj = { description, duration, date, 'userId': _id }
    if (!date) delete exerciseObj.date

    const exerciseSaved = new Exercise(exerciseObj)
    const result = await exerciseSaved.save()
    const user = await User.findOne({ _id })
    res.json({
      '_id': user._id, 'username': user.username, 'description': result.description, 'duration': result.duration,
      'date': result.date.toDateString()
    })
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

module.exports = { createExercise }