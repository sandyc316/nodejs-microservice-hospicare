var cfg       = require('config');

var _         = require('lodash'),
    mixins    = require('../../utilities').mixins(),
    storable  = mixins.Storable;


var modelFactory = require('../models').modelFactory;
var bookingModel = modelFactory.getModel('bookings', cfg, "postgres");


/*
    @class Booking
    @constructor
*/
class Booking extends storable {
    
    constructor() {
        super();
    }

};

/*
    @Desc   Communicates with model to perform database opetations
    @var    repo
*/
var repo = {

    /**
     * Get a booking by id
     *
     * @method getById
     * @return {Promise} 
     */
    getById : id => {
        return new Promise( (resolve, reject) => {
            
            bookingModel.getById(id)
            .then ( booking => {
                return resolve(booking);
            }, rejected => {
                return reject(rejected);
            });

        });
    }

}

/**
 * validate Booking request fields
 *
 * @method  validateBooking
 * @param  {uuid}       patient   
 * @param  {uuid}       address   
 * @param  {string}     speciality
 * @param  {string}     reason    
 * @param  {timestamp}  date      
 * @param  {timestamp}  startAt   
 * @param  {timestamp}  endAt     
 * @return {promise}           
 */
function validateBooking(patient, address, speciality, reason, startAt, endAt) {
    var errors = [];

    return new Promise(( resolve, reject) => {
        if( patient === null || patient === '' ) {
            errors.push({code: 'PATIENT_REQUIRED'});
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

        if(startAt === null || startAt === '') {
            errors.push({code: 'START_TIME_REQUIRED'});
        }

        if(endAt === null || endAt === '') {
            errors.push({code: 'END_TIME_REQUIRED'});
        }


        if(errors.length > 0) {
            return reject(errors);
        } else {
            return resolve(true);
        }
        
    });
}

module.exports = {
    'entity': Booking,
    'repo': repo,
    'validateBooking': validateBooking
}