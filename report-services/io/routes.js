module.exports = function (app) {
	app.use('/report', require('./controllers/report'));
};
