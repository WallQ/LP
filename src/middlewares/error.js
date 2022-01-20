const error = (err, req, res, next) => {
	res.status(err.status || 500).send({
		status: err.status || 500,
		message: err.message || 'Internal Server Error',
		path: req.originalUrl || '/',
	});
};

module.exports = error;
