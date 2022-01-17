const corsOptions = {
	origin: [
		'127.0.0.1:3000',
		'http://127.0.0.1:3000',
		'http://localhost:3000',
	],
	methods: 'GET, POST, PUT, DELETE',
	allowedHeaders: 'Accept, Content-Type, X-Access-Token',
	credentials: true,
	maxAge: 900000,
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;