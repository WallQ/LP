const notFound = (req, res, next) => {
	res.status(404).send({
		status: 404,
		message: "Oops! Sorry, we couldn't found you're looking for.",
	});
};

module.exports = notFound;