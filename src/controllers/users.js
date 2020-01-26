const { genSaltSync, hashSync, compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
require('dotenv/config')

// Models
const User = require('../models/User')

// JSON Response
const response = (code, error, message, data = []) => {
	return status(code).json({ status: code, error, message, data })
}

module.exports = {
	// Get user datas
	get: async (req, res) => {
		try {
			const { id } = req.params
			const user = await User.get('id', id)
			if (user) return res.response(200, false, 'Success to get user data', user)
		} catch (err) {
			return res.response(400, false, 'Failed to get user data', err)
		}
	},

	// Login to user account
	login: async (req, res) => {
		try {
			const { email, password } = req.body

			// Check user's email is already register
			const user = await User.get('email', email)
			if (!user) return res.response(404, true, 'Email not registered yet')

			// Check user's password match
			const isValid = compareSync(password, user.password)
			if (!isValid) return res.response(400, true, 'Password is invalid')

			// Token
			const payload = { id: user.id, name: user.name, email: user.email }
			const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 })
			return res.response(200, false, 'Success to login', { token: 'Bearer ' + token })
		} catch (err) {
			return res.response(400, false, 'Failed to login', err)
		}
	},

	// Register new account
	register: async (req, res) => {
		try {
			const id = uuid()
			const { name, email, password } = req.body
			const data = { id, name, email, password }

			// Check user's email
			const user = await User.get('email', email)
			if (email) return res.response(400, true, 'Email was registered')

			// Register new user
			const registered = await User.register(data)
			if (registered)
				return res.response(200, false, 'Success to register new user', registered)
		} catch (err) {
			return res.response(400, true, 'Failed to register new user', err)
		}
	},

	// Update an account
	update: async (req, res) => {
		try {
			const { id } = req.params
			let { name, email, password } = req.body
			const data = { name, email, password }

			// Change password
			if (password) data.password = hashSync(password, genSaltSync(10))

			// Check user's id
			const user = await User.get('id', id)
			if (!user) return res.response(404, true, 'User is not found')

			// Update user's account
			const updated = await User.update(data)
			if (updated) return res.response(200, false, 'Success to update an account', updated)
		} catch (err) {
			return res.response(400, true, 'Failed to update an account', err)
		}
	},

	// Delete an account
	delete: async (req, res) => {
		try {
			const { id } = req.params

			// Check user's id
			const user = await User.get('id', id)
			if (!user) return res.response(404, true, 'User is not found')

			// Delete user's account
			const deleted = await User.delete(id)
			if (deleted) return res.response(200, false, 'Success to delete an account', user)
		} catch (err) {
			return res.response(400, true, 'Failed to delete an account', err)
		}
	},
}
