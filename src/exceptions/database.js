function connectionException() {
	this.status = 500;
	this.message = "Sorry, we couldn't connect to the database.";
}

function queryException(error) {
	this.status = 500;
	this.message = error.sqlMessage || 'Something went wrong with the query.';
}

module.exports = {
	connectionException,
	queryException,
};
