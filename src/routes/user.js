const express = require('express');
const pool = require('../database');

function UserRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const query = 'SELECT * FROM users';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ tatus: 404, message: 'Users unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Users successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const data = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone_number: req.body.phone,
			};
			const query = 'INSERT INTO users (name,email,password,phone_number) VALUES (?,?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'User unsuccessfully created!', data: [] });
				res.status(200).send({ status: 201, message: 'User successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const data = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone_number: req.body.phone,
				idusers: req.params.id,
			};
			const query = 'UPDATE users SET name = ?, email = ?, password = ?, phone_number = ? WHERE idusers = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'User unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'User successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
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

module.exports = UserRouter;
