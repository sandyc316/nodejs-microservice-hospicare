var cfg         = require('config');

var _           = require('lodash'),
    mixins      = require('../../utilities').mixins(),
    storable    = mixins.Storable,
    Appointment = mixins.Appointment;

var modelFactory = require('../models').modelFactory;
var appointmentModel = modelFactory.getModel('appointment_at_hospitals', cfg, "postgres");

/*
    @class Appointment
    @constructor
*/
class AtHospital extends storable {
    
    constructor() {
        super();

        this.appointment = new Appointment();

        this.appointment.type = 'appointment at hospital';
    }

    set id (id) {
        this._id = id;
    }

    get id () {
        return this.id;
    }

    set end_at (end_at) {
        this.appointment.endAt = end_at;
    }

    get end_at () {
        return this.appointment.endAt;
    }

    set start_at (start_at) {
        this.appointment.startAt = start_at;
    }

    get start_at () {
        return this.appointment.startAt;
    }

    set fixed_by (fixed_by) {
        this.appointment.fixedBy = fixed_by;
    }

    get fixed_by () {
        return this.appointment.fixedBy;
    }

    set status (status) {
        this.appointment.status = status;
    }

    get status () {
        return this.appointment.status;
    }

    set party1 (party1) {
        this.appointment.party1 = party1;
    }

    get party1 () {
        return this.appointment.party1;
    }

    set party2 (party2) {
        this.appointment.party2 = party2;
    }

    get party2 () {
        return this.appointment.party2;
    }

    set reason (reason) {
        this.appointment.reason = reason;
    }

    get reason () {
        return this.appointment.reason;
    }

    set description (description) {
        this.appointment.description = description;
    }

    get description () {
        return this.appointment.description;
    }

    set report (report) {
        this.appointment.report = report;
    }

    get report () {
        return this.appointment.report;
    }

    set speciality (speciality) {
        this.appointment.speciality = speciality;
    }

    get speciality () {
        return this.appointment.speciality;
    }

    set hospital (hospital) {
        this.appointment.hospital = hospital;
    }

    get hospital () {
        return this.appointment.hospital;
    }

};

/*
    @Desc   Communicates with model to perform database opetations
    @var    repo
*/
var repo = {

    /**
     * Get a appointment by id
     *
     * @method getById
     * @return {Promise} 
     */
    getById(id) {
        return new Promise( (resolve, reject) => {
        
            appointmentModel.getById(id)
            .then ( appointment => {

                var appointmentObj = new AtHospital();
                appointmentObj = appointment ? _.extend(appointmentObj, appointment[0]) : null;
                return resolve(appointmentObj);

            }, rejected => {
                return reject(rejected);
            });
        
        });  
    },

    /**
     * create an appointment at hospital
     *
     * @method create
     * @param  {uuid}   patientId
     * @param  {string} patientFirstName
     * @param  {string} patientLastName
     * @param  {string} patientEmail
     * @param  {string} patientPhone
     * @param  {uuid}   hospitalId
     * @param  {string} hospitalName
     * @param  {string} hospitalAddress
     * @param  {string} hospitalEmail
     * @param  {string} hospitalPhone
     * @param  {uuid}   member
     * @param  {string} speciality
     * @param  {string} report
     * @param  {string} description
     * @param  {string} reason
     * @param  {string} status
     * @param  {uuid}   fixedBy
     * @param  {timestamp} startAt
     * @return {json}
     */
    create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, hospitalId, hospitalName, hospitalAddress, hospitalEmail, hospitalPhone, member, speciality, report, description, reason, status,fixedBy, startAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, hospitalId, hospitalName, hospitalAddress, hospitalEmail, hospitalPhone, member, speciality, report, description, reason, status,fixedBy, startAt)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });

        });
    },
    
    /**
     * update status 
     * @param  {uuid}   id
     * @param  {string} status
     * @return {promise}
     */
    updateStatus(id, status) {
        return new Promise( (resolve, reject) => {
        
            appointmentModel.updateStatus(id, status)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });
        
        });
    },

    updateSchedule(id, startAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.updateSchedule(id, startAt)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });
            
        });
    },

    /**
     * update Reports 
     * @param  {uuid}   id
     * @param  {Object} files
     * @return {promise}
     */
    updateReports(id, report) {
        return new Promise( (resolve, reject) => {
        
            appointmentModel.updateReports(id, report)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });
        
        });
    },

    getByPatient(patient, page, per_page, startAt, endAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.getByPatient(patient, page, per_page, startAt, endAt)
            .then( appointment => {

                var appointmentObj = new AtHospital();
                appointmentObj = appointment ? _.extend(appointmentObj, appointment[0]) : null;
                return resolve(appointmentObj);

            }, rejected => {
                return reject(rejected);
            });

        });
    },

    getByDoctor(page, per_page, startAt, endAt, type) {
    return new Promise( (resolve, reject) => {

            appointmentModel.getByDoctor(page, per_page, startAt, endAt, type)
            .then( appointment => {
                
                var appointmentObj = new AtHospital();
                appointmentObj = appointment ? _.extend(appointmentObj, appointment[0]) : null;
                return resolve(appointmentObj);

            }, rejected => {
                return reject(rejected);
            });

        });
    },

    createHospitalAppointment(patient, hospital, member, speciality, report, description, reason, status,fixedBy, startAt) {
        return new Promise( (resolve, reject) => {

            if(member == '') {
                member = null;
            }

            appointmentModel.createHospitalAppointment(patient, hospital, member, speciality, report, description, reason, status,fixedBy, startAt)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });

        });
    },
}

function validateAppointment(patient, hospital, speciality, reason, startAt) {
    var errors = [];

    return new Promise(( resolve, reject) => {
        if( patient === null || patient === '' ) {
            errors.push({code: 'PATIENT_REQUIRED'});
        }
        
        if(hospital === null || hospital === '') {
            errors.push({code: 'HOSPITAL_REQUIRED'});
        }
        

        if(speciality === null || speciality === '') {
            errors.push({code: 'SPECIALITY_REQUIRED'});
        }
        
        if(reason === null || reason === '') {
            errors.push({code: 'REASON_REQUIRED'});
        } 

        if(startAt === null || startAt === '') {
            errors.push({code: 'START_DATE_REQUIRED'});
        }

        if(errors.length > 0) {
            return reject(errors);
        } else {
            return resolve(true);
        }
        
    });
}

module.exports = {
    'entity': Appointment,
    'repo': repo,
    'validateAppointment': validateAppointment
}