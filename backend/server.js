const dotenv = require('dotenv/config')

const express = require('express')
const app = express()
app.use(express.json())

const auth = require('./routes/auth')
app.use('/auth', auth)

const users = require('./routes/users')
app.use('/users', users)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
