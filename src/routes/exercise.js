const express = require('express');
const pool = require('../database');

function ExerciseRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/').get(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const query = 'SELECT * FROM exercice';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ tatus: 404, message: 'Decks unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Decks successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				idExercice: null,
				name: req.body.name,
				description: req.body.description,
			};
			const query = 'INSERT INTO exercice VALUES (?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully created!', data: [] });
				res.status(200).send({ status: 201, message: 'Exercise successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				name: req.body.name,
				description: req.body.description,
				idExercice: req.params.id,
			};
			const query = 'UPDATE exercice SET name = ?, description = ? WHERE idExercice = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'Exercise successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				idExercice: req.params.id,
			};
			const query = 'DELETE FROM exercice WHERE idExercice = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Exercise unsuccessfully deleted!', data: [] });
				res.status(200).send({ status: 200, message: 'Exercise successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = ExerciseRouter;
