const { Exercise } = require("../models/exercise")

const createExercise = async (req, res) => {
  try {
    const { description, duration, date } = req.body
    const { _id } = req.params

    const exerciseObj = { description, duration, date, 'userId': _id }
    if (!date) delete exerciseObj.date

    const exerciseSaved = new Exercise(exerciseObj)
    const result = await exerciseSaved.save()
    res.json(result)
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

module.exports = { createExercise }