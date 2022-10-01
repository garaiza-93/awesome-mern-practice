const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/error')
const connectDB = require('./config/mongodb')
const port = process.env.PORT || 9999
const goals = require('./routes/goalRoutes')
const users = require('./routes/userRoutes')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', goals)
app.use('/api/users', users)
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
