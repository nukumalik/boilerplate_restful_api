const router = require('express').Router()

// Controller
const users = require('../controllers/users')

router
	.get('/:id', users.get())
	.get('/', users.get())
	.post('/login', users.login())
	.post('/register', users.register())
	.patch('/:id', users.update())
	.delete('/:id', users.delete())

module.exports = router
