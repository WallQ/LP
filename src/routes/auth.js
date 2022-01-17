const express = require('express');
const pool = require('../database');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
				phone_number: req.body.phone,
			};
			const query = 'INSERT INTO users (name,email,password,phone_number) VALUES (?,?,?,?)';
			connection.query(query, Object.values(data), async (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) res.status(200).send({ status: 400, auth: false, message: 'Unsuccessfully signed up!', data: [] });
                const token = await jwt.sign({ email: data.email }, 'FLG-LP@2122', { algorithm: 'HS256' }, { expiresIn: 1800000 })
				res.cookie('token', token, {maxAge: 1800000, expires: new Date(Date.now() + 1800000), httpOnly: true})
                .status(200).send({ status: 200, auth: true, message: 'Successfully signed up!', data: results });
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
			const query = 'SELECT * FROM users WHERE email = ?';
			connection.query(query, Object.values(data), async (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) res.status(200).send({ status: 400, auth: false, message: 'Unsuccessfully signed in!', data: [] });
                const match = await bcrypt.compare(data.password, results.password);
                console.log(match);
                if(!match) res.status(200).send({ status: 400, auth: false, message: 'Email or password are wrong!', data: [] });
                const token = await jwt.sign({ email: data.email }, 'FLG-LP@2122', { algorithm: 'HS256' }, { expiresIn: 1800000 })
				res.cookie('token', token, {maxAge: 1800000, expires: new Date(Date.now() + 1800000), httpOnly: true})
                .status(200).send({ status: 200, auth: true, message: 'Successfully signed in!', data: results });
			});
		});
	});

	router.route('/sign-out').get(async (req, res, next) => {
        res.clearCookie('token').status(200).send({ status: 200, auth: false, message: ''})
	});

	router.route('/signed').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const data = {
				idusers: req.params.id,
			};
			const query = 'DELETE FROM users WHERE idusers = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'User unsuccessfully deleted!', data: [] });
				res.status(200).send({ status: 200, message: 'User successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = AuthRouter;
