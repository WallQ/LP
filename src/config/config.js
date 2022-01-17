require('dotenv').config();

const config = {
	development: {
		server: {
			host: process.env.DEV_SERVER_HOST || '127.0.0.1',
			port: process.env.DEV_SERVER_PORT || 3000,
		},
		database: {
			host: process.env.DEV_DATABASE_HOST || '127.0.0.1',
			port: process.env.DEV_DATABASE_PORT || 3306,
			name: process.env.DEV_DATABASE_NAME || 'lp',
			username: process.env.DEV_DATABASE_USERNAME || 'root',
			password: process.env.DEV_DATABASE_PASSWORD || '',
		},
	},
	production: {
		server: {
			host: process.env.PROD_SERVER_HOST || '127.0.0.1',
			port: process.env.PROD_SERVER_PORT || 3000,
		},
		database: {
			host: process.env.PROD_DATABASE_HOST || 'dwdm-lp-flg-sv.mysql.database.azure.com',
			port: process.env.PROD_DATABASE_PORT || 3306,
			name: process.env.PROD_DATABASE_NAME || 'lp',
			username: process.env.PROD_DATABASE_USERNAME || 'dwdm_lp_flg_root',
			password: process.env.PROD_DATABASE_PASSWORD || '6%yXmTN64+4xGDNw',
		},
	},
};

module.exports = config;
