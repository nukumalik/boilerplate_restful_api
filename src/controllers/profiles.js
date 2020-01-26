const uuid = require('uuid/v4')

// Model
const Profile = require('../models/Profile')

// JSON Response
const response = (code, error, message, data = []) => {
	return status(code).json({ status: code, error, message, data })
}

module.exports = {
	// Get user profile
	get: async (req, res) => {
		try {
			const { userId } = req.params

			// Check user's' id
			const user = await Profile.get('id', userId)
			if (!user) return res.promise(404, true, "User's profile is not found")

			return res.response(200, false, 'Success to get user profile', user)
		} catch (err) {
			res.response(400, true, 'Failed to get user profile', err)
		}
	},

	// Add user profile
	add: async (req, res) => {
		try {
			const { userId } = req.params
			const id = uuid()
			const { username, address, phone } = req.body
			const data = { id, userId, username, address, phone }

			// Check user's' id
			const user = await Profile.get('id', userId)
			if (!user) return res.promise(404, true, "User's profile is not found")

			// Added user's profile
			const added = await Profile.add(data)
			if (added) return res.response(200, false, 'Success to add profile', added)
		} catch (err) {
			return res.response(400, true, 'Failed to add profile', err)
		}
	},

	// Update user profile
	update: async (req, res) => {
		try {
			const { userId } = req.params
			const { username, address, phone } = req.body
			const data = { username, address, phone }

			// Check user's' id
			const user = await Profile.get('id', userId)
			if (!user) return res.promise(404, true, "User's profile is not found")

			// Update user's profile
			const updated = await Profile.update(data, id)
			if (updated) return res.response(200, false, 'Success to update user profile', updated)
		} catch (err) {
			return res.response(400, true, 'Failed to update user profile', err)
		}
	},

	// Delete user profile
	delete: async (req, res) => {
		try {
			const { userId } = req.params

			// Check user's id
			const user = await Profile.get('id', userId)
			if (!user) return res.promise(404, true, "User's profile is not found")

			// Delete user's profile
			const deleted = await Profile.delete(userId)
			if (deleted) return res.promise(200, false, 'Success to delete user profile', user)
		} catch (err) {
			return res.response(400, true, 'Failed to delete user profile', err)
		}
	},
}
