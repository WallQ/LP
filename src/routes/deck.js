const express = require('express');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const { idException } = require('../exceptions/id');
const verifyJWT = require('../middlewares/jwt');

function DeckRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM deck';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Decks unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Decks successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM deck WHERE iddeck = ?';
			connection.query(query, Object.values({iddeck:req.params.id}), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Deck unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Deck successfully found!', data: results });
			});
		});
	});

	router.route('/name/:name').get(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM deck WHERE name = ?';
			connection.query(query, Object.values({name: req.body.name}), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Deck unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Deck successfully found!', data: results });
			});
		});
	});

	router.route('/').post(async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				description: req.body.description,
			};
			const query = 'INSERT INTO deck VALUES (?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Deck unsuccessfully created!', data: [] });
				return res.status(200).send({ status: 201, message: 'Deck successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				name: req.body.name,
				description: req.body.description,
				iddeck: req.params.id,
			};
			const query = 'UPDATE deck SET name = ?, description = ? WHERE iddeck = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.changedRows === 0) return res.status(200).send({ status: 400, message: 'Deck unsuccessfully updated!', data: [] });
				return res.status(200).send({ status: 200, message: 'Deck successfully updated!', data: results });
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'DELETE FROM deck WHERE iddeck = ?';
			connection.query(query, Object.values({iddeck: req.params.id}), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Deck unsuccessfully deleted!', data: [] });
				return res.status(200).send({ status: 200, message: 'Deck successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = DeckRouter;
