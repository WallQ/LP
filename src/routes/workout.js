const express = require('express');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const { idException } = require('../exceptions/id');
const verifyJWT = require('../middlewares/jwt');
const verifyROLE = require('../middlewares/role');

function WorkoutRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(verifyROLE('Admin', 'User'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM workout';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workouts unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workouts successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(verifyROLE('Admin', 'User'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM workout WHERE idworkout = ?';
			connection.query(query, Object.values({ idworkout:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully found!', data: results });
			});
		});
	});

	router.route('/name/:name').get(verifyROLE('Admin', 'User'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM workout WHERE name = ?';
			connection.query(query, Object.values({ name: req.body.name }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully found!', data: results });
			});
		});
	});

	router.route('/').post(verifyROLE('Admin'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				imagePath: req.body.image,
				name: req.body.name,
			};
			const query = 'INSERT INTO workout VALUES (?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully created!', data: [] });
				return res.status(200).send({ status: 201, message: 'Workout successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				imagePath: req.body.image,
				name: req.body.name,
				idworkout: req.params.id,
			};
			const query = 'UPDATE workout SET imagePath = ?, name = ? WHERE idworkout = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.changedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully updated!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully updated!', data: results });
			});
		});
	});

	router.route('/:id').delete(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'DELETE FROM workout WHERE idworkout = ?';
			connection.query(query, Object.values({ idworkout: req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Workout unsuccessfully deleted!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout successfully deleted!', data: results });
			});
		});
	});

	router.route('/exercise/:id').get(verifyROLE('Admin', 'User'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT ew.nipe, e.idExercise, e.name, e.description, w.idworkout, w.imagePath, w.name FROM lp.exercise_has_workout as ew INNER JOIN lp.exercise as e ON ew.exercise_idExercise = e.idExercise INNER JOIN lp.workout as w ON ew.workout_idworkout = w.idworkout WHERE ew.workout_idworkout = ?';
			connection.query(query, Object.values({ workout_idworkout:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout exercises unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout exercises successfully found!', data: results });
			});
		});
	});

	router.route('/card/:id').get(verifyROLE('Admin', 'User'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT c.idcard, c.value, c.description, c.imagePath, d.name, d.description FROM lp.card_workout as cw INNER JOIN lp.card as c ON cw.card_idcard = c.idcard INNER JOIN lp.deck as d ON c.deck_iddeck = d.iddeck WHERE cw.workout_idworkout = ? ORDER BY RAND() LIMIT 10';
			connection.query(query, Object.values({ workout_idworkout:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Workout cards unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Workout cards successfully found!', data: results });
			});
		});
	});

	return router;
}

module.exports = WorkoutRouter;
