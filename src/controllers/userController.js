const { User } = require('../models/User')

const createUser = async (req, res) => {
  try {
    const { username } = req.body
    const userRepo = new User({ username })
    const result = await userRepo.save()
    res.json({ '_id': result.id, 'username': result.username })
  } catch (err) {
    res.end()
    console.error('err =>', err)
  }
}

module.exports = { createUser }