const dotenv = require('dotenv/config')

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const auth = require('./routes/auth')
app.use('/auth', auth)

const users = require('./routes/users')
app.use('/users', users)

const todos = require('./routes/todos')
app.use('/todos', todos)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
