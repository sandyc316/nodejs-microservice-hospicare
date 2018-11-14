var cfg         = require('config');

var _           = require('lodash'),
    mixins      = require('../../utilities').mixins(),
    storable    = mixins.Storable,
    Appointment = mixins.Appointment;

var modelFactory = require('../models').modelFactory;
var appointmentModel = modelFactory.getModel('doctor_at_homes', cfg, "postgres");

/*
    @class Appointment
    @constructor
*/
class AtHome extends storable {
    
    constructor() {
        super();

        this.appointment = new Appointment();

        this.appointment.type = 'appointment at home';
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

    set emergency (emergency) {
        this.appointment.emergency = emergency;
    }

    get emergency () {
        return this.appointment.emergency;
    }

    set doctor (doctor) {
        this.appointment.doctor = doctor;
    }

    get doctor () {
        return this.appointment.doctor;
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
     *Create a new appointment
     * 
     * @method create
     * @param  {uuid} patient
     * @param  {uuid} doctor
     * @param  {uuid} member
     * @param  {string} speciality
     * @param  {boolean} emergency
     * @param  {string} address
     * @param  {string} report
     * @param  {string} description
     * @param  {string} reason
     * @param  {string} status 
     * @param  {string} fixedBy
     * @param  {string} prescriptions
     * @param  {uuid} followUp
     * @param  {string} followStatus
     * @param  {string} type
     * @param  {timestamp} startAt
     * @param  {timestamp} endAt
     * @return {promise}
     */
    create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });

        });
    },
    
    

    /**
     *Update an appointment
     * 
     * @method update
     * @param  {uuid} id
     * @param  {uuid} patient
     * @param  {uuid} doctor
     * @param  {uuid} member
     * @param  {string} speciality
     * @param  {boolean} emergency
     * @param  {string} address
     * @param  {string} report
     * @param  {string} description
     * @param  {string} reason
     * @param  {string} status
     * @param  {string} prescriptions
     * @param  {uuid} followUp
     * @param  {string} followStatus
     * @param  {string} type
     * @param  {timestamp} startAt
     * @param  {timestamp} endAt
     * @return {promise}
     */
    update(id, patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.update(id, patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt)
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

    updateSchedule(id, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, startAt, endAt) {
        return new Promise( (resolve, reject) => {

            appointmentModel.updateSchedule(id, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, startAt, endAt)
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

/**
 * Validate the appointment fields
 * 
 * @method validateAppointment
 * 
 * @param  {string} patient
 * @param  {string} doctor
 * @param  {string} speciality
 * @param  {string
 * @param  {string} address
 * @param  {string} reason
 * @param  {string} status
 * @return {promise}
 */
function validateAppointment(patient, doctor, speciality, address, reason, status, startAt) {
    var errors = [];

    return new Promise(( resolve, reject) => {
        if( patient === null || patient === '' ) {
            errors.push({code: 'PATIENT_REQUIRED'});
        }
        
        if(doctor === null || doctor === '') {
            errors.push({code: 'DOCTOR_REQUIRED'});
        }
        

        if(speciality === null || speciality === '') {
            errors.push({code: 'SPECIALITY_REQUIRED'});
        }
        
        if(address === null || address === '') {
            errors.push({code: 'ADDRESS_REQUIRED'});
        }
        
        if(reason === null || reason === '') {
            errors.push({code: 'REASON_REQUIRED'});
        } 

        if(status === null || status === '') {
            errors.push({code: 'STATUS_REQUIRED'});
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


function validateHospitalAppointment(patient, hospital, speciality, reason, startAt) {
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

function upload(files, destination) {

    return new Promise(( resolve, reject) => {
       

    });
}


module.exports = {
    'entity': Appointment,
    'repo': repo,
    'validateAppointment': validateAppointment,
    'upload': upload
}