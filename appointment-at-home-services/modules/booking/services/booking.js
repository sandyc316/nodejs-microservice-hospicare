var _                 = require('lodash');
var   bookingEntities = require('../entities/bookings');
var   Booking         = bookingEntities.entity;
var   repo            = bookingEntities.repo;
var   message         = require('../messages');
var   responseHelper  = require('../../utilities/helper');
var   validateBooking = bookingEntities.validateBooking;
var async 			  = require('async');

var   moduleHelper 	  = require('./helper');
var   rabbitService   = require('./rabbit.js');


module.exports = {

	/**
	 * Create a new booking
	 *
	 * @method  create
	 * @param  {uuid} 		patient
	 * @param  {uuid} 		member 
	 * @param  {uuid} 		address
	 * @param  {string} 	speciality
	 * @param  {string} 	reason    
	 * @param  {timestamp} 	date   
	 * @param  {timestamp} 	startAt
	 * @param  {timestamp} 	endAt
	 * @param  {bool} 		emergency     
	 * @param  {string} 	reports       
	 * @param  {string} 	description  
	 * @param  {string} 	status       
	 * @param  {uuid} 		fixedBy      
	 * @param  {string} 	prescriptions
	 * @param  {string} 	followStatus 
	 * @param  {string} 	type         
	 * @param  {uuid} 		followBy
	 * @return {promise}           
	 */
	create : (patient, member, address, speciality, reason, startAt, endAt, emergency, reports, description, status, fixedBy, prescriptions, followStatus, type, followBy) => validateBooking(patient, address, speciality, reason, startAt, endAt)
	.then( resolved => {
		var respObj = {
			doctor: {},
			appointment: {}
		};

		var msg = {
           data: {
               "patient": patient,
               "member": member,
               "address": address,
               "speciality": speciality,
               "reason": reason,
               "emergency": emergency,
               "reports": reports,
               "description": description,
               "status": status,
               "fixedBy": fixedBy,
               "prescriptions": prescriptions,
               "followStatus": followStatus,
               "type": type,
               "followBy": followBy,
               "startAt": startAt,
               "endAt": endAt
           }
       }

       rabbitService.publishMessage('getDocDetails', msg, '');

       return "Done";
       }, rejected => {

		return responseHelper.createResponseErrorObject(rejected, 'booking');
	}),

	/**
	 * Create new booking
	 *
	 * @method createAsync
	 * @param  {uuid} 		patient
	 * @param  {uuid} 		member 
	 * @param  {uuid} 		address
	 * @param  {string} 	speciality
	 * @param  {string} 	reason    
	 * @param  {timestamp} 	date   
	 * @param  {timestamp} 	startAt
	 * @param  {timestamp} 	endAt 
	 * @param  {bool} 		emergency     
	 * @param  {string} 	reports       
	 * @param  {string} 	description  
	 * @param  {string} 	status       
	 * @param  {uuid} 		fixedBy      
	 * @param  {string} 	prescriptions
	 * @param  {string} 	followStatus 
	 * @param  {string} 	type         
	 * @param  {uuid} 		followBy     
	 * @return {promise}              
	 */
	createAsync : (patient, member, address, speciality, reason, startAt, endAt, emergency, reports, description, status, fixedBy, prescriptions, followStatus, type, followBy) => validateBooking(patient, address, speciality, reason, startAt, endAt)
	.then( resolved => {

		return moduleHelper.getDoctorDetails()
		.then( doctor => {
			return doctor;

		}, rejected => {
			return rejected;
		})
		.then( doctor => {
			respObj.doctor = doctor.data;
			var resp = moduleHelper.createAppointment(patient, doctor.data._id, member, address, speciality, reason, emergency, reports, description, status, fixedBy, prescriptions, followStatus, type, followBy, startAt, endAt);
			return resp;
			
		}, rejected => {
			return rejected;
		})
		.then (resp => {

			respObj.appointment = resp.data[0];
			resp.data = respObj;
			return resp;		
		})
		.catch (error => {
			console.log("Service error is", error);
		});
	}),
	
}