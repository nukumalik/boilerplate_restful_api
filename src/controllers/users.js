const { genSaltSync, hashSync, compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
require('dotenv/config')

// Models
const User = require('../models/User')

// JSON Response
const success = { status: 200, error: false, message: '', data: [] }
const error = { status: 400, error: true, message: '', data: [] }

module.exports = {
	// Get user datas
	get: (req, res) => {
		const { id } = req.params

		User.get(id)
			.then(result => {
				success.message = 'Success to get user data'
				success.data = result
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to get user data'
				error.data = err
				res.status(404).json(error)
			})
	},

	// Login to user account
	login: (req, res) => {
		const { email, password } = req.body

		User.get().then(users => {
			const user = users.filter(person => person.email === email)
			const isMatch = compareSync(password, user[0].password)

			if (isMatch) {
				User.login(email, password).then(result => {
					// Payload
					const payload = {
						id: result.id,
						name: result.name,
						email: result.email
					}

					// Token
					jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
						if (err) throw new Error(err)
						success.message = 'Success to login'
						success.data = [{ id: payload.id, token: 'Bearer ' + token }]
						res.status(200).json(success)
					})
				})
			} else {
				error.message = 'Password is invalid'
				res.status(400).json(error)
			}
		})
	},

	// Register new account
	register: (req, res) => {
		const id = uuid()
		const { name, email, password } = req.body
		const data = { id, name, email, password }

		User.register(data)
			.then(result => {
				success.message = 'Success to register new account'
				success.data = result
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to register new account'
				error.data = err
				res.status(400).json(error)
			})
	},

	// Update an account
	update: (req, res) => {
		const { id } = req.params
		let { name, email, password } = req.body

		if (password) {
			const salt = genSaltSync(10)
			const hash = hashSync(password, salt)
			password = hash
		}

		const data = [name, email, password]

		User.update(data, id)
			.then(() => {
				success.message = 'Success to update an account'
				success.data = data
				res.status(200).json(data)
			})
			.catch(err => {
				error.message = 'Failed to update an account'
				error.data = err
				res.status(400).json(error)
			})
	},

	// Delete an account
	delete: (req, res) => {
		const { id } = req.params

		User.delete(id)
			.then(() => {
				success.message = 'Success to delete an account'
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to delete an account'
				error.data = err
				res.status(400).json(error)
			})
	}
}
