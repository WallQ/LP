const verifyROLE = (...allowedRoles) => {
	return (req, res, next) => {
		const roles = [...allowedRoles];
		const result = roles.includes(req.role);
		if (!result) return res.status(200).send({ status: 401, path: req.originalUrl, message: 'You don\'t have permission to access this content.', data: [] });
		next();
	};
};

module.exports = verifyROLE;