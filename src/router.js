const express = require('express');

const UserRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth');
const WorkoutRoutes = require('./routes/workout');
const ExerciseRoutes = require('./routes/exercise');
const DeckRoutes = require('./routes/deck');
const CardRoutes = require('./routes/card');

function initialize() {
	const api = express();

	api.use('/public', express.static('public'));
	api.use('/user', UserRoutes());
	api.use('/auth', AuthRoutes());
	api.use('/workout', WorkoutRoutes());
	api.use('/exercise', ExerciseRoutes());
	api.use('/deck', DeckRoutes());
	api.use('/card', CardRoutes());

	return api;
}

module.exports = {
	initialize: initialize,
};
