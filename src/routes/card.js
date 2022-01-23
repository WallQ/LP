const express = require('express');
const pool = require('../database');
const { connectionException, queryException } = require('../exceptions/database');
const { idException } = require('../exceptions/id');
const verifyJWT = require('../middlewares/jwt');
const verifyROLE = require('../middlewares/role');

function CardRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));
	router.use(verifyJWT);

	router.route('/').get(verifyROLE('Admin'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM card';
			connection.query(query, (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Cards unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Cards successfully found!', data: results });
			});
		});
	});

	router.route('/:id').get(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'SELECT * FROM card WHERE idcard = ?';
			connection.query(query, Object.values({ idcard:req.params.id }), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && !results.length) return res.status(200).send({ status: 404, message: 'Card unsuccessfully found!', data: [] });
				return res.status(200).send({ status: 200, message: 'Card successfully found!', data: results });
			});
		});
	});

	router.route('/').post(verifyROLE('Admin'), async (req, res, next) => {
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				deck_iddeck: req.body.id,
				value: req.body.value,
				description: req.body.description,
				imagePath: req.body.image,
			};
			const query = 'INSERT INTO card VALUES (?,?,?,?)';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Card unsuccessfully created!', data: [] });
				return res.status(200).send({ status: 201, message: 'Card successfully created!', data: results });
			});
		});
	});

	router.route('/:id').put(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const data = {
				deck_iddeck: req.body.deckId,
				value: req.body.value,
				description: req.body.description,
				imagePath: req.body.image,
				idcard: req.body.id,
			};
			const query = 'UPDATE card SET deck_iddeck = ?, value = ?, description = ?, imagePath = ? WHERE idcard = ?';
			connection.query(query, Object.values(data), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.changedRows === 0) return res.status(200).send({ status: 400, message: 'Card unsuccessfully updated!', data: [] });
				return res.status(200).send({ status: 200, message: 'Card successfully updated!', data: results });
			});
		});
	});

	router.route('/:id').delete(verifyROLE('Admin'), async (req, res, next) => {
		if (Number.isNaN(Number.parseInt(req.params.id))) return next(new idException());
		pool.getConnection((error, connection) => {
			if (error) return next(new connectionException());
			const query = 'DELETE FROM card WHERE idcard = ?';
			connection.query(query, Object.values({idcard: req.params.id}), (error, results) => {
				connection.release();
				if (error) return next(new queryException(error));
				if (results && results.affectedRows === 0) return res.status(200).send({ status: 400, message: 'Card unsuccessfully deleted!', data: [] });
				return res.status(200).send({ status: 200, message: 'Card successfully deleted!', data: results });
			});
		});
	});

	return router;
}

module.exports = CardRouter;
