module.exports = function (app) {
	app.use('/appointment-at-home', require('./controllers/doctor_at_home'));
	app.use('/appointment-at-hospital', require('./controllers/appointment_at_hospital'));
};
