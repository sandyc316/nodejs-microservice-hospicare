var _  			 	  = require('lodash');
var conf 		 	  = require('../../../config/development'),
	doctorModule	  = conf.doctors,
	appointmentModule = conf.appointment;

var requestify = require('requestify');

var rp = require('request-promise');

module.exports = {

	/**
	 * Get doctor details
	 *
	 *@method getDoctorDetails
	 * @return {promise}
	 */
	getDoctorDetails : () => requestify.get(doctorModule.getDoctorDetailsURL)
	.then(response => {
		return JSON.parse(response.body);

	}, rejected => {
		return rejected;
	}),

	/**
	 * Create a new appointment
	 *
	 * @method  create
	 * @param  {uuid} patient
	 * @param  {uuid} doctor
	 * @param  {uuid} member
	 * @param  {string} speciality
	 * @param  {boolean} emergency
	 * @param  {uuid} address
	 * @param  {string} reports
	 * @param  {string} description  
	 * @param  {string} reason
	 * @param  {boolean} status
	 * @param  {string} fixedBy      
	 * @param  {string} prescriptions
	 * @param  {string} followStatus 
	 * @param  {string} type
	 * @param  {uuid} followBy     
	 * @return {promise}     
	 */
	createAppointment( patient, doctor, member, address, speciality, reason, emergency, reports, description, status, fixedBy, prescriptions, followStatus, type, followBy, startAt, endAt ) {

		var options = {
		    url: "appointmentModule.createAppointmentURL",
		    method: 'POST',
		    form: {
		    	'patient': patient,
		    	'doctor': doctor,
		    	'member': member,
		    	'address': address,
		    	'speciality': speciality,
		    	'reason': reason,
		    	'emergency': emergency,
		    	'reports': reports,
		    	'description': description,
		    	'status': status,
		    	'fixedBy': fixedBy,
		    	'followStatus': followStatus,
		    	'prescriptions': prescriptions,
		    	'type': type,
		    	'followBy': followBy,
		    	'startAt': startAt,
		    	'endAt': endAt
			}
		}

		return rp(options)
		.then(body => {

			return JSON.parse(body);
		}, rejected => {
			console.log("Rejected is", rejected);
		})
		.catch(err => {
			console.log("Error is", err);
			return (err);
		});
		
	}

}