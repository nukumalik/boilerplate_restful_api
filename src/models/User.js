const db = require('../config/database')

module.exports = {
	// Get user datas
	get: id => {
		return new Promise((resolve, rejected) => {
			let sql = 'select * from users'
			id ? (sql += ` where id=${id}`) : sql

			db.query(sql, (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Login to user account
	login: (email, password) => {
		return new Promise((resolve, rejected) => {
			const sql = 'select * from users where email = ? and password = ?'

			db.query(sql, [email, password], (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Register new account
	register: data => {
		return new Promise((resolve, rejected) => {
			const sql = 'insert into users set ?'

			db.query(sql, data, (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Update user account
	update: (data, id) => {
		return new Promise((resolve, rejected) => {
			const sql = 'update users set ? where id = ?'

			db.query(sql, [data, id], (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	},

	// Delete user account
	delete: id => {
		return new Promise((resolve, rejected) => {
			const sql = 'delete from users where id = ?'

			db.query(sql, id, (error, result) => {
				error ? rejected(error) : resolve(result)
			})
		})
	}
}
