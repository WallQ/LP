require('dotenv').config();

const config = {
	development: {
		server: {
			host: process.env.SERVER_HOST || '127.0.0.1',
			port: process.env.SERVER_PORT || 3000,
		},
		database: {
			host: process.env.DATABASE_HOST || '127.0.0.1',
			port: process.env.DATABASE_PORT || 3306,
			name: process.env.DATABASE_NAME || 'lp',
			username: process.env.DATABASE_USERNAME || 'root',
			password: process.env.DATABASE_PASSWORD || null,
			charset: process.env.DATABASE_CHARSET || 'utf8_general_ci',
			limit: process.env.DATABASE_LIMIT || 10,
			timeout: process.env.DATABASE_TIMEOUT || 10,
		},
	},
	production: {},
};

module.exports = config;
