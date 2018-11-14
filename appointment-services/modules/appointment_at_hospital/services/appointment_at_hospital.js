var _                       = require('lodash');
var   appointmentEntities   = require('../entities/appointment_at_hospitals');
var   Appointment           = appointmentEntities.entity;
var   repo                  = appointmentEntities.repo;
var   message               = require('../messages');
var   responseHelper        = require('../../utilities/helper');
var   validateAppointment   = appointmentEntities.validateAppointment;

module.exports = {

    /**
     * Get a appointment by id
     *
     * @method  getById
     * @param  {uuis} id
     * @return {promise}
     */
    getById : id => repo.getById(id)
    .then ( resolved => {

        if(resolved || resolved != null) {
           return responseHelper.createResponseSuccessObject('', 'appointment_at_hospital', resolved);
        } else {
            return responseHelper.createResponseErrorObject([{code: 'NOT_FOUND'}], 'appointment_at_hospital');
        }
    }, rejected => {
        return responseHelper.createResponseErrorObject([{code: 'NOT_FOUND'}], 'appointment_at_hospital');
    }),

    /**
     * create a new hospital appointment
     *
     * @method createHospitalAppointment
     * @param  {json}   patient
     * @param  {json}   hospital 
     * @param  {uuid}   member       
     * @param  {string} speciality     
     * @param  {string} report       
     * @param  {string} description  
     * @param  {string} reason       
     * @param  {string} status       
     * @param  {string} fixedBy 
     * @param  {time}   startAt
     * @return {promise}              
     */
    create : (patientId, patientFirstName, patientLastName, patientEmail, patientPhone, hospitalId, hospitalName, hospitalAddress, hospitalEmail, hospitalPhone, member, speciality, report, description, reason, status,fixedBy, startAt) => validateAppointment(patientId, hospitalId, speciality, reason, startAt)
    .then ( resolved => {

        return repo.create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, hospitalId, hospitalName, hospitalAddress, hospitalEmail, hospitalPhone, member, speciality, report, description, reason, status,fixedBy, startAt)
        .then( resolved => {
            return responseHelper.createResponseSuccessObject({code: 'ADDED_SUCCESSFULLY'}, 'appointment_at_hospital', resolved);
        }, rejected => {
            return responseHelper.createResponseErrorObject(rejected, 'appointment_at_hospital');    
        });

    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment_at_hospital');
    }),

    /**
     * Update the appointment status
     *
     * @method updateStatus
     * @param  {uuid}   id
     * @param  [STRING} status
     * @return {json}
     */
    cancel : (id, status) => repo.updateStatus(id, status)
    .then( resolved => {
        return resolved;
    }, rejected => {
        return rejected;
    }),

    /**
     * Update appointment schedule
     *
     * @method updateSchedule
     * @param  {uuid} id
     * @param  {timestamp} startAt
     * @return {json}
     */
    updateSchedule : (id, startAt) => repo.updateSchedule(id, startAt)
    .then( resolved => {
        return resolved;
    }, rejected => {
        return rejected;
    }),

    /**
     * Upload booking reports
     *
     * @method uploadReports
     * @param  {uuid}   id
     * @param  {Object} files
     * @return {promise}
     */
    updateReports : (id, report) => repo.updateReports(id, report)
    .then( resolved => {
        return responseHelper.createResponseSuccessObject({code: 'UPDATED_SUCCESSFULLY'}, 'appointment_at_hospital', resolved);
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment_at_hospital');
    }),

    /**
     * Get patient appointment
     *
     * @method getByPatient
     * @param  {uuid} patient
     * @param  {integer} page
     * @param  {integer} per_page
     * @param  {timestamp} startAt
     * @param  {timestamp} endAt
     * @return {promise}
     */
    getByPatient : (patient, page, per_page, startAt, endAt) => repo.getByPatient(patient, page, per_page, startAt, endAt)
    .then( resolved => {
        return responseHelper.createResponseSuccessObject('', 'appointment_at_hospital', resolved);                
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment_at_hospital');
    }),
}