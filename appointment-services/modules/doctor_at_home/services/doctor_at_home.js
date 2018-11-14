var _                       = require('lodash');
var   appointmentEntities   = require('../entities/doctor_at_homes');
var   Appointment           = appointmentEntities.entity;
var   repo                  = appointmentEntities.repo;
var   message               = require('../messages');
var   responseHelper        = require('../../utilities/helper');
var   validateAppointment   = appointmentEntities.validateAppointment;
var   upload                = appointmentEntities.upload;

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
           return responseHelper.createResponseSuccessObject('', 'doctor_at_home', resolved);
        } else {
            return responseHelper.createResponseErrorObject([{code: 'NOT_FOUND'}], 'doctor_at_home');
        }
    }, rejected => {
        return responseHelper.createResponseErrorObject([{code: 'NOT_FOUND'}], 'doctor_at_home');
    }),

    /**
     * create a new appointment
     *
     * @method create
     * @param  {uuid}   patient
     * @param  {uuid}   doctor 
     * @param  {uuid}   member       
     * @param  {string} speciality   
     * @param  {bool}   emergency    
     * @param  {uuid}   address      
     * @param  {string} report       
     * @param  {string} description  
     * @param  {string} reason       
     * @param  {string} status       
     * @param  {string} fixedBy      
     * @param  {string} prescriptions
     * @param  {uuid}   followUp       
     * @param  {string} followStatus 
     * @param  {string} type         
     * @return {promise}              
     */
    create : (patientId, patientFirstName, patientLastName, patientEmail, patientPhone, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt) => validateAppointment(patientId, doctorId, speciality, address, reason, status, startAt)
    .then ( resolved => {

        return repo.create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt)
        .then( resolved => {
            return responseHelper.createResponseSuccessObject({code: 'ADDED_SUCCESSFULLY'}, 'doctor_at_home', resolved);
        }, rejected => {
            return responseHelper.createResponseErrorObject(rejected, 'doctor_at_home');    
        });

    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'doctor_at_home');
    }),  

    /**
     * update a new appointment
     *
     * @method update
     * @param  {uuid}   id
     * @param  {uuid}   patient
     * @param  {uuid}   doctor 
     * @param  {uuid}   member       
     * @param  {string} speciality   
     * @param  {bool}   emergency    
     * @param  {uuid}   address      
     * @param  {string} report       
     * @param  {string} description  
     * @param  {string} reason       
     * @param  {string} status    
     * @param  {string} prescriptions
     * @param  {uuid}   followUp       
     * @param  {string} followStatus 
     * @param  {string} type         
     * @return {promise}              
     */
    update : (id, patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt) => validateAppointment(patient, doctor, speciality, address, reason, status, startAt, endAt)
    .then ( resolved => {

        return repo.update(id, patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt)
        .then( resolved => {

            return responseHelper.createResponseSuccessObject({code: 'UPDATED_SUCCESSFULLY'}, 'doctor_at_home', resolved);
        }, rejected => {

            return responseHelper.createResponseErrorObject(rejected, 'doctor_at_home');
        });

    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'doctor_at_home');
    }),

    /**
     * Update the doctor_at_home status
     *
     * @method updateStatus
     * @param  {uuid}   id
     * @param  [STRING} status
     * @return {promise}
     */
    updateStatus : (id, status) => repo.updateStatus(id, status)
    .then( resolved => {
        return resolved;
    }, rejected => {
        return rejected;
    }),

    updateSchedule : (id, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, startAt, endAt) => repo.updateSchedule(id, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, startAt, endAt)
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
        return responseHelper.createResponseSuccessObject({code: 'UPDATED_SUCCESSFULLY'}, 'appointment', resolved);
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment');
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
        return responseHelper.createResponseSuccessObject('', 'appointment', resolved);                
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment');
    }),

    /**
     * Get doctors appointment
     *
     * @method  getByDoctor
     * @param  {integer}    page
     * @param  {integer}    per_page
     * @param  {timestamp}  startAt
     * @param  {timestamp}  endAt
     * @param  {string}     type
     * @return {promise}
     */
    getByDoctor : (page, per_page, startAt, endAt, type) => repo.getByDoctor(page, per_page, startAt, endAt, type)
    .then( resolved => {
        return responseHelper.createResponseSuccessObject('', 'appointment', resolved);                
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'appointment');
    }),
}