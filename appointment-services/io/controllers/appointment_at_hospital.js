var express   = require('express'),
	router    = express.Router(),
	wrap      = require('co-express'),
	_         = require('lodash'),
	co        = require('co'),
	os        = require('os');

var appointmentService 	= require('../../modules/appointment_at_hospital/services/appointment_at_hospital');

var rabbitService   	= require('../../modules/appointment_at_hospital/services/rabbit');

rabbitService.subscribeMessage('bookAHospitalAppointment', '', function(message) {
	console.log('Received message at appointment_at_hospital ', message);
	
	appointmentService.create(message.data.patient.id, message.data.patient.firstName, message.data.patient.lastName, message.data.patient.email, message.data.patient.phone, message.data.hospital.id, message.data.hospital.name, message.data.hospital.address, message.data.hospital.email, message.data.hospital.phone, message.data.member, message.data.speciality, message.data.report, message.data.description, message.data.reason, message.data.status,message.data.fixedBy, message.data.startAt)
	.then( appointment => {
		
		var msg = {
			appointment: appointment,
			message: 'Appointment booking completed.',
			amount: message.data.amount
		};

		rabbitService.publishMessage('createHospitalBookingOrder', msg, '');

	}, rejected => {
		console.log('rejected at appointment at hospital service', rejected);
	});

});

rabbitService.subscribeMessage('updateHospitalAppointmentSchedule', '', function(message) {
	console.log('Received message at appointment_at_hospital ', message);
	
	appointmentService.updateSchedule(message.data.id, message.data.startAt)
	.then( appointment => {
		
		var msg = {
			appointment: appointment,
			message: 'Appointment Schedule updated.'
		};

        rabbitService.publishMessage('sendHospitalSchedulePushNotification', msg, '');
        rabbitService.publishMessage('sendHospitalScheduleEmail', msg, '');
        rabbitService.publishMessage('sendHospitalScheduleSms', msg, '');

	}, rejected => {
		console.log('rejected at appointment at hospital service', rejected);
	});

});

rabbitService.subscribeMessage('cancelHospitalAppointment', '', function(message) {
	console.log('Received message at appointment_at_hospital ', message);
	
	appointmentService.cancel(message.data.id, message.data.status)
	.then( appointment => {
		
		var msg = {
			appointment: appointment,
			message: 'Appointment cancelled',
			status: message.data.status
		};

		rabbitService.publishMessage('cancelHospitalBookingOrder', msg, '');

	}, rejected => {
		console.log('rejected at appointment at hospital service', rejected);
	});

});

router.get('/:id', wrap(function* (req, res, next) {

	try {

		var resp = yield appointmentService.getById(req.query.id);
		return res.json(resp);
			
	} catch (e) {
		return next(e);
	}

}));

router.post('/', wrap(function* (req, res, next) {
		
	try {

		var resp = yield appointmentService.create(req.body.patient, req.body.doctor, req.body.member, req.body.speciality, req.body.emergency, req.body.address, req.body.report, req.body.description, req.body.reason, req.body.status, req.body.fixedBy, req.body.prescriptions, req.body.followUp, req.body.followStatus, req.body.type, req.body.startAt, req.body.endAt);
		return res.json(resp);

	} catch (e) {
		return next(e);
	}

}));

router.post('/:id', wrap(function* (req, res, next) {
		
	try {
			
		var resp = yield appointmentService.update(req.params.id, req.body.patient, req.body.doctor, req.body.member, req.body.speciality, req.body.emergency, req.body.address, req.body.report, req.body.description, req.body.reason, req.body.status, req.body.fixedBy, req.body.prescriptions, req.body.followUp, req.body.followStatus, req.body.type, req.body.startAt, req.body.endAt);
		return res.json(resp);

	} catch (e) {
		return next(e);
	}

}));

router.get('/', wrap(function* (req, res, next) {

	try {

		var resp = yield appointmentService.getByPatient(req.query.patient, req.query.page, req.query.per_page, req.query.startAt, req.query.endAt);
		return res.json(resp);
			
	} catch (e) {
		return next(e);
	}

}));

module.exports = router;