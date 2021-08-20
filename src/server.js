require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())
app.use('/api', router)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(process.env.PORT || 3000, () => {
  console.log('Database connected and server running', __dirname)
})

