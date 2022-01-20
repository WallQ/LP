function idException() {
	this.status = 400;
	this.message = 'The ID specified is invalid.';
}

module.exports = {
	idException,
};
