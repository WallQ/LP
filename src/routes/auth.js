const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const verifyJWT = require('../middlewares/jwt');

function AuthRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/sign-up').post(async (req, res, next) => {
		pool.getConnection(async (error, connection) => {
			if (error) console.error(error);
            const data = {
				name: req.body.name,
				email: req.body.email,
				password: await bcrypt.hash(req.body.password, 10),
				phoneNumber: req.body.phone,
			};
			const query1 = 'SELECT * FROM user WHERE email = ?';
			connection.query(query1, Object.values({email:req.body.email}), (error, results) => {
				if (error) console.error(error);
				if (results && results.length) return res.status(200).send({ status: 400, auth: false, message: 'Email address already registered!', data: [] });
				const query2 = 'INSERT INTO user (name,email,password,phoneNumber) VALUES (?,?,?,?)';
				connection.query(query2, Object.values(data), (error, results) => {
					connection.release();
					if (error) console.error(error);
					if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, auth: false, message: 'Unsuccessfully signed up!', data: [] });
					const token = jwt.sign({ id: results.insertId, email: data.email, role: 'User' }, 'DWDM-LP-FLG@2122', { algorithm: 'HS256' }, { expiresIn: 1800000 });
					return res.cookie('token', token, {maxAge: 1800000, expires: new Date(Date.now() + 1800000), httpOnly: true}).status(200).send({ status: 200, auth: true, message: 'Successfully signed up!', data: results });
				});
			});
		});
	});

	router.route('/sign-in').post(async (req, res, next) => {
		pool.getConnection(async (error, connection) => {
			if (error) console.error(error);
			const data = {
				email: req.body.email,
				password: req.body.password,
			};
			const query = 'SELECT * FROM user WHERE email = ?';
			connection.query(query, Object.values(data), async (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) return res.status(200).send({ status: 400, auth: false, message: 'Email address not registered!', data: [] });
                const match = await bcrypt.compare(data.password, results[0].password);
                if(!match) return res.status(200).send({ status: 400, auth: false, message: 'Email or password are wrong!', data: [] });
                const token = jwt.sign({ id: results[0].iduser, email: data.email, role: results[0].role }, 'DWDM-LP-FLG@2122', { algorithm: 'HS256' }, { expiresIn: 1800000 });
				return res.cookie('token', token, {maxAge: 1800000, expires: new Date(Date.now() + 1800000), httpOnly: true}).status(200).send({ status: 200, auth: true, message: 'Successfully signed in!', data: results });
			});
		});
	});

	router.route('/sign-out').get(verifyJWT, async (req, res, next) => {
        return res.clearCookie('token').status(200).send({ status: 200, auth: false, message: 'Successfully signed out!', data: [] })
	});

	router.route('/signed').get(verifyJWT, async (req, res, next) => {
		return res.status(200).send({ status: 200, auth: true, message: 'User is currently authenticated!', data: [] })
	});

	return router;
}

module.exports = AuthRouter;
