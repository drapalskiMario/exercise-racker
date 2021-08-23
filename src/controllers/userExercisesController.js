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

    if (req.query.from && req.query.to && req.query.limit) {
      let { from, to, limit } = req.query
      from = new Date(from)
      to = new Date(to)
      const logsFilter = userExercises.log
        .filter(({ date }) => date.getTime() >= from.getTime())
        .filter(({ date }) => date.getTime() <= to.getTime())
        .slice(0, Number(limit))
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, from: from.toDateString(), to: to.toDateString(),
        count: logsFilter.length, log: logsFilter
      })
    }

    if (req.query.from && req.query.to && !req.query.limit) {
      let { from, to } = req.query
      from = new Date(from)
      to = new Date(to)
      const logsFilter = userExercises.log
        .filter(({ date }) => date.getTime() >= from.getTime())
        .filter(({ date }) => date.getTime() <= to.getTime())
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, from: from.toDateString(), to: to.toDateString(),
        count: logsFilter.length, log: logsFilter
      })
    }

    if (req.query.from && !req.query.to && !req.query.limit) {
      let { from } = req.query
      from = new Date(from)
      const logsFilter = userExercises.log
        .filter(({ date }) => date.getTime() >= from.getTime())
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, from: from.toDateString(),
        count: logsFilter.length, log: logsFilter
      })
    }

    if (!req.query.from && req.query.to && req.query.limit) {
      let { to, limit } = req.query
      to = new Date(to)
      const logsFilter = userExercises.log
        .filter(({ date }) => date.getTime() <= to.getTime())
        .slice(0, Number(limit))
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, to: to.toDateString(),
        count: logsFilter.length, log: logsFilter
      })
    }

    if (!req.query.from && req.query.to && !req.query.limit) {
      let { to } = req.query
      to = new Date(to)
      const logsFilter = userExercises.log
        .filter(({ date }) => date.getTime() <= to.getTime())
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, to: to.toDateString(),
        count: logsFilter.length, log: logsFilter
      })
    }

    if (!req.query.from && !req.query.to && req.query.limit) {
      let { limit } = req.query
      const logsFilter = userExercises.log
        .slice(0, Number(limit))
        .map(({ description, duration, date }) => ({
          description,
          duration,
          'date': date.toDateString()
        }))

      res.json({
        _id, username, count: logsFilter.length, log: logsFilter
      })
    }

    if (!req.query.from && !req.query.to && !req.query.limit) {
      res.json({ _id, username, count, log })
    }

  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

module.exports = { createUser, selectAllUsers, addExercisesInUser, selectExercisesByUserId }