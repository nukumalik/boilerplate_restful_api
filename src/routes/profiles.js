const router = require('express').Router()
const passport = require('passport')

// Controller
const profiles = require('../controllers/profiles')

// Auth
const auth = passport.authenticate('jwt', { session: false })

router
	.get('/:userId', auth, profiles.get())
	.post('/:userId', auth, profiles.add())
	.patch('/:userId', auth, profiles.update())
	.delete('/:userid', auth, profiles.delete())

module.exports = router
