const express = require('express');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const verifyJWT = require('../middlewares/jwt');

function ExerciseRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM exercice';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 404, message: 'Exercise unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Exercise successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				idExercice: null,
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

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				description: req.body.description,
				idExercice: req.params.id,
			};
			const query = 'UPDATE exercice SET name = ?, description = ? WHERE idExercice = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'Exercise successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				idExercice: req.params.id,
			};
			const query = 'DELETE FROM exercice WHERE idExercice = ?';
			connection.query(query, Object.values(data), (error, results) => {
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
