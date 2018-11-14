module.exports = function (app) {
	app.use('/booking', require('./controllers/booking'));
};
