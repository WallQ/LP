const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const mysql = require('mysql');

const pool = mysql.createPool({
	host: config.database.host,
	port: config.database.port,
	database: config.database.name,
	user: config.database.username,
	password: config.database.password,
	charset: config.database.charset,
	connectionLimit: parseInt(config.database.limit),
	connectTimeout: parseInt(config.database.timeout),
});

module.exports = pool;
