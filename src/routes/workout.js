const express = require('express');
const pool = require('../database');

function WorkoutRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/').get(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const query = 'SELECT * FROM workout';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ tatus: 404, message: 'Workouts unsuccessfully found!', data: [] });
				res.status(200).send({ status: 200, message: 'Workouts successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				idworkout: null,
				imagepath: null,
				name: req.body.name,
			};
			const query = 'INSERT INTO workout VALUES (?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Workout unsuccessfully created!', data: [] });
				res.status(200).send({ status: 201, message: 'Workout successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				imagepath: req.body.imagepath,
				name: req.body.name,
				idworkout: req.params.id,
			};
			const query = 'UPDATE workout SET imagepath = ?, name = ? WHERE idworkout = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Workout unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'Workout successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				iddeck: req.params.id,
			};
			const query = 'DELETE FROM workout WHERE idworkout = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Workout unsuccessfully deleted!', data: [] });
				res.status(200).send({ status: 200, message: 'Workout successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = WorkoutRouter;
