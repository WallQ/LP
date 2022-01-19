const express = require('express');
const pool = require('../database');
const verifyJWT = require('../middlewares/jwt');

function WorkoutRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const query = 'SELECT * FROM workout';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workouts unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workouts successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const query = 'SELECT * FROM workout WHERE idworkout = ?';
			connection.query(query, Object.values({idworkout:req.params.id}), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully found!', data: results });
			});
		});
	});

	router.route('/name/:name').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const query = 'SELECT * FROM workout WHERE name = ?';
			connection.query(query, Object.values({name: req.body.name}), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const data = {
				imagePath: req.body.image,
				name: req.body.name,
			};
			const query = 'INSERT INTO workout VALUES (?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully created!', data: [] });
				return res.status(200).send({ status: 201, message: 'Workout successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const data = {
				imagePath: req.body.image,
				name: req.body.name,
				idworkout: req.params.id,
			};
			const query = 'UPDATE workout SET imagePath = ?, name = ? WHERE idworkout = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && results.changedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully updated!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully updated!', data: results });
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) console.error(error);
			const query = 'DELETE FROM workout WHERE idworkout = ?';
			connection.query(query, Object.values({idworkout: req.params.id}), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully deleted!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = WorkoutRouter;
