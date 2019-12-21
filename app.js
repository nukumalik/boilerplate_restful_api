const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')

// Main App
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS Middleware
app.use(cors())

// Passport Middleware
app.use(passport.initialize())
require('./src/helpers/auth')(passport)

// Routes
app.use(require('./src/config/routes'))

// Port
const port = process.env.PORT || 3000

// Connect to Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

// Logger
app.use(logger('tiny'))
