const config = require('../config/config')[process.env.NODE_ENV || 'development'];
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
	const token = req.cookies.token || req.headers['x-access-token'];
	if (!token) return res.status(200).send({ status: 401, auth: false, path: req.originalUrl, message: 'Your token provided is invalid or has expired.', data: [] });
	jwt.verify(token, 'DWDM-LP-FLG@2122', (err, decoded) => {
		if (err) return res.status(200).send({ status: 401, auth: false, path: req.originalUrl, message: 'Your token provided is invalid or has expired.', data: [] });
		req.id = decoded.id;
		req.email = decoded.email;
		req.role = decoded.role;
		next();
	});
};

module.exports = verifyJWT;