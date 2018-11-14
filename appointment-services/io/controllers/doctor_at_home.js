var express   = require('express'),
	router    = express.Router(),
	wrap      = require('co-express'),
	_         = require('lodash'),
	co        = require('co'),
	os        = require('os');

var appointmentService 	= require('../../modules/doctor_at_home/services/doctor_at_home');

var rabbitService   	= require('../../modules/doctor_at_home/services/rabbit');

rabbitService.subscribeMessage('bookAnAppointment', '', function(message) {
	console.log('Received message at appointment ', message);
	 
	appointmentService.create(message.data.patient.id, message.data.patient.firstName, message.data.patient.lastName, message.data.patient.email, message.data.patient.phone, message.data.doctor.id, message.data.doctor.firstName, message.data.doctor.lastName, message.data.doctor.email, message.data.doctor.phone, message.data.member, message.data.speciality, message.data.emergency, message.data.address, message.data.report, message.data.description, message.data.reason, message.data.status, message.data.fixedBy, message.data.prescriptions, message.data.followUp, message.data.followStatus, message.data.type, message.data.startAt, message.data.endAt)
	.then( resolved => {
	// send push notifation
	// send email
	// send sms
	}, rejected => {
		console.log('rejected at appointment', rejected);
	});

});

rabbitService.subscribeMessage('updateAnAppointmentSchedule', '', function(message) {
	console.log('Received message at appointment ', message);
	
	appointmentService.updateSchedule(message.data.id, message.data.doctor.id, message.data.doctor.firstName, message.data.doctor.lastName, message.data.doctor.email, message.data.doctor.phone, message.data.startAt, message.data.endAt)
	.then( appointment => {
		var msg = {
			appointment: appointment,
			message: 'Booking schedule updated'
		};

		rabbitService.publishMessage('sendScheduleUpdatePushNotification', msg, '');
		rabbitService.publishMessage('sendScheduleUpdateEmail', msg, '');
		rabbitService.publishMessage('sendScheduleUpdateSms', msg, '');
	}, rejected => {
		console.log('rejected at appointment', rejected);		
	});

});

rabbitService.subscribeMessage('updateBookingStatus', '', function(message) {
	console.log('Received message at appointment ', message);

	appointmentService.updateStatus(message.data.order.appointment, message.data.status)
	.then( resolved => {
		
		if(message.message === 'cancel') {
			var msg = {
				appointment: resolved,
				message: 'Booking cancelled successfully'
			};

			rabbitService.publishMessage('cancelBookingOrder', msg, '');
			rabbitService.publishMessage('sendBookingCancelledPushNotification', msg, '');
			rabbitService.publishMessage('sendBookingCancelledEmail', msg, '');
			rabbitService.publishMessage('sendBookingCancelledSms', msg, '');


		} else {
			var msg = {
				order: message.data.order,
				message: 'payment completed'
			};

			rabbitService.publishMessage('sendBookingConfirmedPushNotification', msg, '');
			rabbitService.publishMessage('sendBookingConfirmedEmail', msg, '');
			rabbitService.publishMessage('sendBookingConfirmedSms', msg, '');
		} 

	}, rejected => {
		console.log('rejected at appointment', rejected);		
	});

});

rabbitService.subscribeMessage('updateBookingReports', '', function(message) {
	console.log('Received message at appointment ', message);
	
	appointmentService.updateReports(message.data.id, message.data.report)
	.then( resolved => {
		// send push notifation
		// send email
		// send sms
	}, rejected => {
		console.log('rejected at appointment', rejected);
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

router.get('/doctor', wrap(function* (req, res, next) {

	try {

		var resp = yield appointmentService.getByDoctor(req.query.page, req.query.per_page, req.query.startAt, req.query.endAt, req.query.type);
		return res.json(resp);
			
	} catch (e) {
		return next(e);
	}

}));


module.exports = router;