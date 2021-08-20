const { Router } = require('express')
const { createUser } = require('./controllers/userController')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

router.post('/users', createUser)

module.exports = router