const mysql = require('mysql')
require('dotenv/config')

// Env
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env

// Connection
const db = mysql.createConnection({
	host: DATABASE_HOST,
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME
})

// Database Connection
db.connect()

module.exports = db
