const db = require('../config/database')

module.exports = {
	// Get user profile
	get: id => {
		return new Promise((resolve, rejected) => {
			const sql = 'select * from profiles where userId = ?'

			db.query(sql, id, (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Add user profile
	add: (data, id) => {
		return new Promise((resolve, rejected) => {
			const sql = 'insert into profiles set ? where userId = ?'

			db.query(sql, [data, id], (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Update user profile
	update: (data, id) => {
		return new Promise((resolve, rejected) => {
			const sql = 'update profiles set ? where userId = ?'

			db.query(sql, [data, id], (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Delete
	delete: id => {
		return new Promise((resolve, rejected) => {
			const sql = 'delete from profiles where userId = ?'

			db.query(sql, id, (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	}
}
