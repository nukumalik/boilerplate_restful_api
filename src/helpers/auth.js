const { ExtractJwt, Strategy } = require('passport-jwt')
require('dotenv/config')

// Model
const User = require('../models/User')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
	secretOrKey: process.env.SECRET_OR_KEY
}

module.exports = passport => {
	passport.use(
		new Strategy(opts, (jwt_payload, done) => {
			User.get(jwt_payload.id).then(result => {
				if (result) {
					return done(null, result)
				} else {
					return done(null, false)
				}
			})
		})
	)
}
