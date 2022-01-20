function inputException(errors) {
	this.status = 400;
	this.message = 'Your request is invalid.';
    this.errors = errors;
}

module.exports = {
	inputException,
};
