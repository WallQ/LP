const express = require('express');

const UserRoutes = require('./routes/user')
const AuthRoutes = require('./routes/auth')
const DeckRouter = require('./routes/deck');
const ExerciseRouter = require('./routes/exercise');
const WorkoutRouter = require('./routes/workout');

function initialize() {
	const api = express();

	api.use('/public', express.static('public'));
	api.use('/user', UserRoutes());
	api.use('/auth', AuthRoutes());
	api.use('/deck', DeckRouter());
	api.use('/exercise', ExerciseRouter());
	api.use('/workout', WorkoutRouter());

	return api;
}

module.exports = {
	initialize: initialize,
};
