var cfg       = require('config');

var _         = require('lodash'),
    mixins    = require('../../utilities').mixins(),
    storable  = mixins.Storable,
    file      = mixins.File,
    Contact   = mixins.Contact,
    Address   = mixins.Address;

var modelFactory = require('../models').modelFactory;
var patientModel = modelFactory.getModel('patients', cfg, "postgres");
/*
    @class Patient
    @constructor
*/
class Patient extends storable {
    
    constructor() {
        super();

        /*
        @property contact
        @type {Contact}
        */
        this.contact = new Contact();

        /*
            @property role (role)
            @type {enum} [contact, admin] 
            @default contact
        */
        this.role = 'contact';
    }

    set id (id) {
        this._id = id;
    }

    get id () {
        return this.id;
    }

    set first_name (first_name) {
        this.contact.firstName = first_name;
    }

    get first_name () {
        return this.contact.firstName;
    }

    set last_name (last_name) {
        this.contact.lastName = last_name;
    }

    get last_name () {
        return this.contact.lastName;
    }

    set email (email) {
        this.contact.email = email;
    }

    get email () {
        return this.contact.email;
    }

    set phone (phone) {
        this.contact.phone = phone;
    }

    get phone () {
        return this.contact.phone;
    }

    set medical_profile (medical_profile) {
        this.medicalProfile = medical_profile;
    }

    /**
     * Validate patient request params
     *
     * @method validate
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     * @param {Number} phone 
     * @return {promise} Boolean
     */
    static validate (firstName, lastName, email, phone) {
        var errors = [];

        return new Promise(( resolve, reject) => {
            if( !firstName ) {
                errors.push({code: 'FIRST_NAME_REQUIRED'});
            }
            
            if( !lastName ) {
                errors.push({code: 'LAST_NAME_REQUIRED'});
            }
            
            if( !email ) {
                errors.push({code: 'EMAIL_REQUIRED'});
            } else {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                if (!re.test(email.toLowerCase())) {
                    errors.push({code: 'INVALID_EMAIL_FORMAT'});
                }    
            }
        
            if( !phone  ) {
                errors.push({code: 'PHONE_REQUIRED'});
            }

            if(errors.length > 0) {
                return reject(errors);
            } else {
                return resolve(true);
            }
            
        });
    }

};

class Addresses extends storable {

    constructor () {
        super();
        
        this.address = new Address();
        console.log('this.address', this.address);
    }

    set id (id) {
        this._id = id;
    }

    get id () {
        return this.id;
    }

    set lat (lat) {
        this.address.lat = lat;
    }

    get lat () {
        return this.address.lat;
    }

    set address (address) {
        this.adress.address = address;
    }

    get address () {
        return this.address.address;
    }

    set locality (locality) {
        this.adress.locality = locality;
    }

    get locality () {
        return this.address.locality;
    }

    set street (street) {
        this.address.street = street;
    }

    set city (city) {
        this.address.city = city;
    }

    get city () {
        return this.address.city;
    }

    set zipcode (zipcode) {
        this.address.zipcode = zipcode;
    }

    get zipcode () {
        return this.address.zipcode;
    }

    set state (state) {
        this.address.state = state;
    }

    get state () {
        return this.address.state;
    }

    set country (country) {
        this.address.country = country;
    }

    get country () {
        return this.address.country;
    }

    set tag (tag) {
        this.address.tag = tag;
    }

    get tag () {
        return this.address.tag;
    }
};

/*
    @Desc   Communicates with model to perform database opetations
    @var    repo
*/
var repo = {

    /**
     * Get a patient by id
     *
     * @method getById
     * @return {Promise} 
     */
    getById : id => {
        return new Promise( (resolve, reject) => {

            patientModel.getById(id)
            .then ( patient => {
                var patientObj = new Patient();
                patientObj = patient ? _.extend(patientObj, patient[0]) : null;

                return resolve(patientObj);
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Create a patient profile
     *
     * @method create
     * @param firstName string
     * @param lastName string
     * @param email string
     * @param phone string
     * @return {Promise} 
     */
    create : (firstName, lastName, email, phone) => {
        return new Promise( (resolve, reject) => {

            patientModel.create(firstName, lastName, email, phone)
            .then( patient => {
                
                var patientObj = new Patient();
                patientObj = patient && patient.length ? _.extend(patientObj, patient[0]) : null;
                
                return resolve(patientObj);

            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Get a patient by email
     *
     * @method getByEmail
     * @param email string
     * @return {Promise} 
     */
    getByEmail : (email) => {
        return new Promise( (resolve, reject) => {

            patientModel.getByEmail(email)
            .then( patient => {
                var patientObj = new Patient();
                patientObj = patient && patient.length ? _.extend(patientObj, patient[0]) : null;
                
                return resolve(patientObj);
                
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Add patient medical profile 
     * 
     * @method addMedicalProfile
     * @param patient uuid
     * @param medicalProfile json
     * @return {promise}
     */
    addMedicalProfile : (patient, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) => {
        return new Promise( (resolve, reject) => {

            patientModel.addMedicalProfile(patient, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory)
            .then( profile => {

                var patientObj = new Patient();
                patientObj = patient ? _.extend(patientObj, patient[0]) : null;

                return resolve(patientObj);
            }, rejected => {
                return reject(rejected);
            });

        });
    } ,

    /**
     * Add a new address
     *
     * @method addUserAddress
     * @param id uuid
     * @param lat double
     * @param lng double
     * @param address string
     * @param street string
     * @param locality  string
     * @param city string
     * @param zipcode string
     * @param state string
     * @param country string
     * @param tag string
     * @return {promise}
     */
    addUserAddress : (id, lat, lng, address, street, locality, city, zipcode, state, country, tag) => {
        return new Promise( (resolve, reject) => {

            patientModel.addUserAddress(id, lat, lng, address, street, locality, city, zipcode, state, country, tag)
            .then( address => {
                return resolve({code: 'ADDRESS_ADDED_SUCCESSFULLY'});
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Get all the address by user id
     *
     * @method getAddressByUserId
     * @param userId uuid
     * @return {promise}
     */
    getAddressByUserId : userId => {
        return new Promise( (resolve, reject) => {

            patientModel.getAddressByUserId(userId)
            .then( address => {

                var addresses = [];
                for(var i = 0 ; i < address.length ; i ++) {

                    var addressObj = new Addresses();
                    console.log('addressObj are', addressObj);
                    //addressObj = address ? _.extend(addressObj, address[i]) : null;
                    //addresses[i] = addressObj;
                }
                
                return resolve(addresses);
            }, rejected => {
                return rejected;
            });

        });
    },

    /**
     * Update a address
     *
     * @method updateUserAddress
     * @param id uuid
     * @param lat double
     * @param lng double
     * @param address string
     * @param street string
     * @param locality  string
     * @param city string
     * @param zipcode string
     * @param state string
     * @param country string
     * @param tag string
     * @return {promise}
     */
    updateUserAddress : (id, addressId, lat, lng, address, street, locality, city, zipcode, state, country, tag) => {
        return new Promise( (resolve, reject) => {

            patientModel.updateUserAddress(id, addressId, lat, lng, address, street, locality, city, zipcode, state, country, tag)
            .then( addresses => {
                return resolve({code: 'ADDRESS_UPDATED_SUCCESSFULLY'});
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Get the address by id
     *
     * @method getAddressById
     * @param addressId uuid
     * @return {promise}
     */
    getAddressById : addressId => {
        return new Promise( (resolve, reject) => {

            patientModel.getAddressById(addressId)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     *Check the patient medical profile 
     *
     * @method isProfileUpdated
     * @param userId uuid
     * @return {promise}
     */
    isProfileUpdated : userId => {
        return new Promise( (resolve, reject) => {

            patientModel.isProfileUpdated(userId)
            .then( resolved => {
                return resolve(resolved);
            }, rejected => {
                return reject(rejected);
            });
        });
    },

    /**
     * Update a patient in the db
     *
     * @static
     * @method update
     * @for    patients.Repo
     * @param  {Object} patient - Patient object
     * @return {Promise} Boolean acknowledgment
     */
    update: patient => patientModel.update(console.log("Updating patient from repo")),

    /**
     * Update a patient's profile picture in the db
     *
     * @method updatePicture
     * @param  {Object} patient - Patient object
     * @return {Promise}      Boolean acknowledgment
     */
    updatePicture: patient => patientModel.updatePicture(patient.touch()),

}


module.exports = {
    'entity': Patient,
    'repo': repo
}