const db = require('../config/database')

const promise = (sql, data = []) => {
	return new Promise((resolve, rejected) => {
		db.query(sql, data, (error, result) => error ? rejected(error) : resolve(result)
	})
}

module.exports = {
	// Get user profile
	get: id => promise('select * from profiles where userId = ?', id),

	// Add user profile
	add: (data) => promise('insert into profiles set ?', data),

	// Update user profile
	update: (data, id) => promise('update profiles set ? where userId = ?', [data, id]),

	// Delete
	delete: id => promise('delete from profiles where userId = ?', id)
}
