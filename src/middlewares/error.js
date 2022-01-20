const error = (err, req, res, next) => {
	const { status, message, errors } = err;
	let customErrors = {};
	if (errors) {
		errors.forEach((error) => {
			customErrors[error.param] = error.msg;
		})
	}
	res.status(status || 500).send({
		status: status || 500,
		path: req.originalUrl || '/',
		message: message || 'Internal Server Error',
		data: customErrors
	});
};

module.exports = error;
