const express = require('express');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const { idException } = require('../exceptions/id');
const verifyJWT = require('../middlewares/jwt');
const verifyROLE = require('../middlewares/role');

function ExerciseRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(verifyROLE('Admin'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM exercice';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 404, message: 'Exercises unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Exercises successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM exercice WHERE idexercise = ?';
			connection.query(query, Object.values({ idexercise:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 404, message: 'Exercise unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Exercise successfully found!', data: results });
			});
		});
	});

	router.route('/').post(verifyROLE('Admin'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				description: req.body.description,
			};
			const query = 'INSERT INTO exercice VALUES (?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully created!', data: [] });
				res.status(200).send({ status: 201, message: 'Exercise successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				description: req.body.description,
				idexercise: req.params.id,
			};
			const query = 'UPDATE exercice SET name = ?, description = ? WHERE idexercise = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'Exercise successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'DELETE FROM exercice WHERE idexercise = ?';
			connection.query(query, Object.values({ idexercise:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully deleted!', data: [] });
				res.status(200).send({ status: 200, message: 'Exercise successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = ExerciseRouter;
