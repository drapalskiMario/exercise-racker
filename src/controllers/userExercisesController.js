const { UserExercises } = require('../models/UserExercise')

const createUser = async (req, res) => {
  try {
    const { username } = req.body
    const userRepo = new UserExercises({ username })
    const result = await userRepo.save()
    res.json({ '_id': result.id, 'username': result.username })
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

const selectAllUsers = async (req, res) => {
  try {
    const arrayUsers = await UserExercises.find()
    res.json(arrayUsers)
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

const addExercisesInUser = async (req, res) => {
  try {
    const { description, duration, date } = req.body
    const { _id } = req.params

    const exerciseObj = { description, duration, date }
    if (!date) { 
      exerciseObj.date = new Date()
    } else {
      exerciseObj.date = new Date(exerciseObj.date)
    }

    const user = await UserExercises.findOne({ _id })
    user.log.push(exerciseObj)
    user.count = user.log.length
    await user.save()
    res.json({
      '_id': user._id, 'username': user.username, 'description': exerciseObj.description, 'duration': Number(exerciseObj.duration),
      'date': exerciseObj.date.toDateString()
    })
  } catch (err) {
    console.error('err =>', err)
  }
}

const selectExercisesByUserId = async (req, res) => {
  try {
    const userId = req.params['_id']
    const userExercises = await UserExercises.findOne({ _id: userId })
    const { _id, username, log, count } = userExercises
    res.json({ _id, username, log, count })
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

module.exports = { createUser, selectAllUsers, addExercisesInUser, selectExercisesByUserId }