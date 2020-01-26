const db = require('../config/database')

const promise = (sql, data = []) => {
	return new Promise((resolve, rejected) => {
		db.query(sql, data, (error, result) => error ? rejected(error) : resolve(result)
	})
}

module.exports = {
	// Get user datas
	get: (key, value) => {
		let sql = 'select * from users'
		key && value ? promise(sql += ` where ${key}=${value}`) : promise(sql)
	},

	// Login to user account
	login: (email, password) => promise('select * from users where email = ? and password = ?', [email, password]),

	// Register new account
	register: data => promise('insert into users set ?', data),

	// Update user account
	update: (data, id) => promise('update users set ? where id = ?', [data, id]),

	// Delete user account
	delete: id => promise('delete from users where id = ?', id)
}
