const express = require('express');
const pool = require('../database');

function CardRouter() {
	const router = express();
	router.use(express.json({ limit: '100mb' }));
	router.use(express.urlencoded({ limit: '100mb', extended: true }));

	return router;
}

module.exports = CardRouter;
