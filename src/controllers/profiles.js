const uuid = require('uuid/v4')

// Model
const Profile = require('../models/Profile')

// JSON Response
const success = { status: 200, error: false, message: '', data: [] }
const error = { status: 400, error: true, message: '', data: [] }

module.exports = {
	// Get user profile
	get: (req, res) => {
		const { userId } = req.params

		Profile.get(userId)
			.then(result => {
				success.message = 'Success to get user profile'
				success.data = result
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to get user profile'
				error.data = err
				res.status(400).json(error)
			})
	},

	// Add user profile
	add: (req, res) => {
		const { userId } = req.params
		const id = uuid()
		const { username, address, phone } = req.body
		const data = { id, userId, username, address, phone }

		Profile.add(data)
			.then(() => {
				success.message = 'Success to add profile'
				success.data = data
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to add profile'
				error.data = err
				res.status(400).json(error)
			})
	},

	// Update user profile
	update: (req, res) => {
		const { userId } = req.params
		const { username, address, phone } = req.body
		const data = { username, address, phone }

		Profile.update(data, userId)
			.then(result => {
				success.message = 'Success to update user profile'
				success.data = result
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to update user profile'
				error.data = err
				res.status(400).json(error)
			})
	},

	// Delete user profile
	delete: (req, res) => {
		const { userId } = req.params

		Profile.delete(userId)
			.then(() => {
				success.message = 'Success to delete user profile'
				res.status(200).json(success)
			})
			.catch(err => {
				error.message = 'Failed to delete user profile'
				error.data = err
				res.status(400).json(error)
			})
	}
}
