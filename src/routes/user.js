const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const { idException } = require('../exceptions/id');
const verifyJWT = require('../middlewares/jwt');

function UserRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT iduser, name, phoneNumber, email, role FROM user';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Users unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Users successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT iduser, name, phoneNumber, email, role FROM user WHERE iduser = ?';
			connection.query(query, Object.values({ iduser:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'User unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'User successfully found!', data: results });
			});
		});
	});

	router.route('/email/:email').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT iduser, name, phoneNumber, email, role FROM user WHERE email = ?';
			connection.query(query, Object.values({ email: req.body.email }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'User unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'User successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection(async (error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				email: req.body.email,
				password: await bcrypt.hash(req.body.password, 10),
				role: req.body.role,
				phoneNumber: req.body.phone,
			};
			const query = 'INSERT INTO user (name,email,password,role,phoneNumber) VALUES (?,?,?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'User unsuccessfully created!', data: [] });
				return res.status(200).send({ status: 201, message: 'User successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				role: req.body.role,
				phoneNumber: req.body.phone,
				iduser: req.params.id,
			};
			const query = 'UPDATE user SET name = ?, email = ?, password = ?, role = ?, phoneNumber = ? WHERE iduser = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.changedRows === 0) return res.status(200).send({ status: 400, message: 'User unsuccessfully updated!', data: [] }); 
				return res.status(200).send({ status: 200, message: 'User successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'DELETE FROM users WHERE iduser = ?';
			connection.query(query, Object.values({ iduser: req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'User unsuccessfully deleted!', data: [] });
				return res.status(200).send({ status: 200, message: 'User successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = UserRouter;
