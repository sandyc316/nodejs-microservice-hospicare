var cfg       = require('config');

var _         = require('lodash'),
    mixins    = require('../../utilities').mixins(),
    storable  = mixins.Storable,
    file      = mixins.File,
    User      = mixins.User;

var modelFactory = require('../models').modelFactory;
var memberModel = modelFactory.getModel('members', cfg, "postgres");

var memberTypes = ['friend', 'son', 'father', 'daughter', 'mother', 'nephew'];

/*
    @class Member
    @constructor
*/
class Member extends storable {
    
    constructor() {
        super();

        /*
        @property User
        @type {User}
        */
        this.user = new User();

    }

    set id (id) {
        this._id = id;
    }

    get id () {
        return this.id;
    }

    set first_name (first_name) {
        this.user.firstName = first_name;
    }

    get first_name () {
        return this.user.firstName;
    }

    set last_name (last_name) {
        this.user.lastName = last_name;
    }

    get last_name () {
        return this.user.lastName;
    }

    set relationship (relationship) {
        this.user.relationship = relationship;
    }

    get relationship () {
        return this.user.relationship;
    }

    set medical_profile (medical_profile) {
        this.user.medicalProfile = medical_profile;
    }


    /**
     * Validate member request params
     *
     * @method validate
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} relation
     * @return {promise} Boolean
     */
    static validate (firstName, lastName, relation) {
        var errors = [];

        return new Promise(( resolve, reject) => {
            if( !firstName ) {
                errors.push({code: 'FIRST_NAME_REQUIRED'});
            }
            
            if( !lastName ) {
                errors.push({code: 'LAST_NAME_REQUIRED'});
            }

            if( !relation ) {
                errors.push({code: 'RELATIONSHIP_REQUIRED'});
            }

            if( memberTypes.indexOf(relation) < 0) {
                errors.push({code: 'INVALID_RELATIONSHIP'});
            }

            if( errors.length > 0 ) {
                return reject(errors);
            } else {
                return resolve(true);
            }
            
        });
    }
};

/*
    @Desc   Communicates with model to perform database opetations
    @var    repo
*/
var repo = {

    /**
     * Get a member by id
     *
     * @method getById
     * @return {Promise} 
     */
    getById : id => {
        return new Promise( (resolve, reject) => {
        
            memberModel.getById(id)
            .then ( member => {
                
                var memberObj = new Member();
                memberObj = member ? _.extend(memberObj, member[0]) : null;
                return resolve(memberObj);

            }, rejected => {
                return reject(rejected);
            });
        });
    },

    /**
     * add a new member
     *
     * @method add
     * @param  {string} firstName
     * @param  {string} lastName
     * @param  {string} relation
     * @param  {uuid} patient
     * @return {promise}
     */
    add : (firstName, lastName, relation, patient) => {
        return new Promise( (resolve, reject) => {
     
            memberModel.add(firstName, lastName, relation, patient)
            .then( member => {
                return resolve({code: 'MEMBER_ADDED_SUCCESSFULLY'});
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Get member details by patient id
     *
     * @method getMembersByPatientId
     * @param  {uuid} patient
     * @return {promise}
     */
    getMembersByPatientId : patient => {
        return new Promise( (resolve, reject) => {

            memberModel.getMembersByPatientId(patient)
            .then( members => {
                var result = [];

                for(var i = 0 ; i < members.length ; i++) {
                    var memberObj = new Member();
                    memberObj = members[i] ? _.extend(memberObj, members[i]) : null;
                    result[i] = memberObj;
                }

                return resolve(result);

            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Get member details by Id
     *
     * @method  getMemberById
     * @param  {uuid} memberId
     * @return {promise}
     */
    getMemberById : memberId => {
        return new Promise ( (resolve, reject) => {

            memberModel.getById(memberId)
            .then( member => {
                var memberObj = new Member();
                memberObj = member ? _.extend(memberObj, member[0]) : null;
                return resolve(memberObj);

            }, rejected => {
                return reject(rejected);
            });
        });
    },

    /**
     * Get member by patient and member Id 
     *
     * @method getByPatientAndId
     * @param  {uuid} patient
     * @param  {uuid} memberId
     * @return {promise}
     */
    getByPatientAndId : (patient, memberId) => {
        return new Promise( (resolve, reject) => {

            memberModel.getByPatientAndId(patient, memberId)
            .then( member => {
                var memberObj = new Member();
                memberObj = member ? _.extend(memberObj, member[0]) : null;
                return resolve(memberObj);

            }, rejected => {
                return reject(rejected);
            });
        });
    },

    /**
     * Add medical profile
     *
     * @method addMedicalProfile
     * @param  {uuid}       memberId
     * @param  {uuid}       gender
     * @param  {timestamp}  birthDate
     * @param  {string}     bloodGroup
     * @param  {string}     height
     * @param  {integer}    weight
     * @param  {string}     allergies
     * @param  {string}     medicalHistory
     * @return {promise}
     */
    addMedicalProfile : (patient, memberId, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) => {
        return new Promise( (resolve, reject) => {

            memberModel.addMedicalProfile(patient, memberId, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory)
            .then( resolved => {
                return resolve({'code': 'MEDICAL_PROFILE_ADDED_SUCCESSFULLY'});
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Update member details
     *
     * @method updateMemberById
     * @param  {uuid}   memberId
     * @param  {string} firstName
     * @param  {string} lastName
     * @param  {string} relationship
     * @return {promise}
     */
    updateMemberById : (memberId, firstName, lastName, relationship) => {
        return new Promise( (resolve, reject) => {

            memberModel.updateMemberById(memberId, firstName, lastName, relationship)
            .then( resolved => {
                return resolve({code: 'MEMBER_UPDATED_SUCCESSFULLY'});
            }, rejected => {
                return reject(rejected);
            });

        });
    },
}


module.exports = {
    'entity': Member,
    'repo': repo
}