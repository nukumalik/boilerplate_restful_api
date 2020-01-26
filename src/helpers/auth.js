const { ExtractJwt, Strategy } = require('passport-jwt')
require('dotenv/config')

// Model
const User = require('../models/User')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
	secretOrKey: process.env.SECRET_OR_KEY,
}

module.exports = passport => {
	passport.use(
		new Strategy(opts, async (jwt_payload, done) => {
			const jwt = await User.get(jwt_payload.id)
			if (jwt) {
				return done(null, jwt)
			} else {
				return done(null, false)
			}
		}),
	)
}
