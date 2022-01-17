const express = require('express');
const pool = require('../database');

function DeckRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	router.route('/').get(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const query = 'SELECT * FROM deck';
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
				iddeck: null,
				name: req.body.name,
				description: req.body.description,
			};
			const query = 'INSERT INTO deck VALUES (?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Deck unsuccessfully created!', data: [] });
				res.status(200).send({ status: 201, message: 'Deck successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				name: req.body.name,
				description: req.body.description,
				iddeck: req.params.id,
			};
			const query = 'UPDATE deck SET name = ?, description = ? WHERE iddeck = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Deck unsuccessfully updated!', data: [] }); 
				res.status(200).send({ status: 200, message: 'Deck successfully updated!', data: results }); 
			});
		});
	});

	router.route('/:id').delete(async (req, res, next) => {
		pool.getConnection(function (error, connection) {
			if (error) console.error(error);
			const data = {
				iddeck: req.params.id,
			};
			const query = 'DELETE FROM deck WHERE iddeck = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) console.error(error);
				if (!results) res.status(200).send({ status: 400, message: 'Deck unsuccessfully deleted!', data: [] });
				res.status(200).send({ status: 200, message: 'Deck successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = DeckRouter;
