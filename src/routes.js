const { Router } = require('express')
const { createExercise } = require('./controllers/exerciseController')
const { createUser, selectAllUsers } = require('./controllers/userController')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

router.post('/api/users', createUser)
router.get('/api/users', selectAllUsers)

router.post('/api/users/:_id/exercises', createExercise)

module.exports = router