const router = require('express').Router()
const { authenticate } = require('passport')

// Controller
const users = require('../controllers/users')

// Authentication
const isAuth = authenticate('jwt', { session: false })

router
	.get('/:id', users.get())
	.get('/', users.get())
	.post('/login', users.login())
	.post('/register', users.register())
	.patch('/:id', isAuth, users.update())
	.delete('/:id', isAuth, users.delete())

module.exports = router
