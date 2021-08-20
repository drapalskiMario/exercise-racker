const { Router } = require('express')
const { createUser, selectAllUsers } = require('./controllers/userController')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

router.post('/api/users', createUser)
router.get('/api/users', selectAllUsers)

module.exports = router