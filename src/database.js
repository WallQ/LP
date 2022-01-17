const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const mysql = require('mysql');

const pool = mysql.createPool({
	host: config.database.host,
	port: config.database.port,
	database: config.database.name,
	user: config.database.username,
	password: config.database.password,
});

module.exports = pool;
