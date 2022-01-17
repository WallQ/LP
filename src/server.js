const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const app = require('./app');

const server = app.listen(config.server.port, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log(`Server running at -> http://${host}:${port}/`);
});
