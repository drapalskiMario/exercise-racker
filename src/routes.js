const { Router } = require('express')
const { createUser, selectAllUsers, addExercisesInUser, selectExercisesByUserId } = require('./controllers/userExercisesController')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

router.post('/api/users', createUser)
router.get('/api/users', selectAllUsers)
router.post('/api/users/:_id/exercises', addExercisesInUser)
router.get('/api/users/:_id/logs', selectExercisesByUserId)

module.exports = router