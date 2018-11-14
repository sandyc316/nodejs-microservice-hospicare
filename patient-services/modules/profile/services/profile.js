var _                 = require('lodash');
var   patientEntities = require('../entities/patients');
var   Patient         = patientEntities.entity;
var   repo            = patientEntities.repo;
var   message         = require('../messages');
var   responseHelper  = require('../../utilities/helper');

module.exports = {

    /**
     * Get profile by Id
     *
     * @method getById
     * @param  {uuid} id
     * @return {promise}
     */
    getById : id => repo.getById(id)
    .then ( resolved => {
        return responseHelper.createResponseSuccessObject('', 'profile', resolved);
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'profile');
    }),

    /**
     * Update profile
     * @return {promise}
     */
    updateProfile : () =>  repo.update()
    .then( function (result) {
        return responseHelper.createResponseSuccessObject('', 'profile', result);
    }, function (errors) {
        return responseHelper.createResponseErrorObject(errors, 'profile');
    }),

    /**
     * Create a new profile
     *
     * @method createProfile
     * @param  {string} firstName
     * @param  {string} lastName
     * @param  {string} email
     * @param  {string} phone
     * @return {promise}
     */
    createProfile : (firstName, lastName, email, phone) => Patient.validate(firstName, lastName, email, phone)
    .then( function(resolved) {
        return repo.getByEmail(email)
        .then(resolved => {

            if (!resolved) {
                return repo.create(firstName, lastName, email, phone)
                .then(resolved => {
                    console.log(resolved);
                    return responseHelper.createResponseSuccessObject({'code' : 'PROFILE_CREATED_SUCCESSFULLY' }, 'profile', resolved);
                
                }, rejected => {
                    return responseHelper.createResponseErrorObject(rejected, 'profile');
                });

            } else {
                return responseHelper.createResponseErrorObject([{'code': 'EMAIL_ALREADY_EXIST'}], 'profile');    
            }
            
        }, rejected => {
            return responseHelper.createResponseErrorObject(rejected, 'profile');
        });
        
        
    }, function(rejected) {
        return responseHelper.createResponseErrorObject(rejected, 'profile');
    }),


    /**
     * Create medical profile
     *
     * @method createMedicalProfile
     * @param  {uuid}       id
     * @param  {string}     gender
     * @param  {timestamp}  birthDate
     * @param  {string}     bloodGroup
     * @param  {string}     height
     * @param  {integer}    weight
     * @param  {string}     allergies
     * @param  {string}     medicalHistory
     * @return {promise}
     */
    createMedicalProfile : (id, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) => repo.getById(id)
    .then( profile => {

        if(profile) {

            return repo.addMedicalProfile(id, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory)
            .then( resolved => {
                return responseHelper.createResponseSuccessObject({code: 'MEDICAL_PROFILE_ADDED_SUCCESSFULLY'}, 'profile', resolved);
            
            }, rejected => {
                return responseHelper.createResponseErrorObject(rejected, 'profile'); 
            
            });

        } else {
            return responseHelper.createResponseErrorObject([{code: 'PATIENT_NOT_FOUND'}], 'profile'); 
        }
        
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'profile');
    }),

    /**
     * Add user address
     *
     * @method addUserAddress
     * @param  {uuid}   id
     * @param  {string} lat
     * @param  {string} lng
     * @param  {string} address
     * @param  {string} stree
     * @param  {string} locality
     * @param  {string} city
     * @param  {string} zipcode
     * @param  {string} state
     * @param  {string} country
     * @param  {string} tag 
     * @return {promise}
     */
    addUserAddress : (id, lat, lng, address, street, locality, city, zipcode, state, country, tag) => repo.addUserAddress(id, lat, lng, address, street, locality, city, zipcode, state, country, tag)
    .then( address => {
        return responseHelper.createResponseSuccessObject(address, 'profile');
    }, rejected => {
       return responseHelper.createResponseErrorObject(rejected, 'profile'); 
    }),

    /**
     * Update user address
     *
     * @method updateUserAddress
     * @param  {uuid}   id
     * @param  {uuid}   addressId
     * @param  {string} lat
     * @param  {string} lng
     * @param  {string} address
     * @param  {string} street
     * @param  {string} locality
     * @param  {string} city
     * @param  {string} zipcode
     * @param  {string} state
     * @param  {string} country
     * @param  {string} tag
     * @return {promise}
     */
    updateUserAddress : (id, addressId, lat, lng, address, street, locality, city, zipcode, state, country, tag) => repo.getAddressById(addressId)
    .then( resolved => {

        if(resolved) {

            return repo.updateUserAddress(id, addressId, lat, lng, address, street, locality, city, zipcode, state, country, tag)
            .then( resolved => {
                return responseHelper.createResponseSuccessObject(resolved, 'profile');
            }, rejected => {
                return responseHelper.createResponseErrorObject(rejected, 'profile'); 
            });

        } else {
            return responseHelper.createResponseSuccessObject(resolved, 'profile');
        }

    }, rejected => {
       return responseHelper.createResponseErrorObject(rejected, 'profile'); 
    }),

    /**
     * Get address by user Id
     *
     * @method getAddressByUserId
     * @param  {uuid} userId
     * @return {promise}
     */
    getAddressByUserId : userId => repo.getAddressByUserId(userId)
    .then( addresses => {
        return responseHelper.createResponseSuccessObject('', 'profile', addresses);
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'profile');
    }),

    /**
     * Check profile of user
     *
     * @method isProfileUpdated
     * @param  {uuid} userId
     * @return {promise}
     */
    isProfileUpdated : userId => repo.isProfileUpdated(userId)
    .then( patient => {

        if(patient.medical_profile) {
            return responseHelper.createResponseSuccessObject({code: 'PROFILE_UPDATED'}, 'profile');    
        } else {
            return responseHelper.createResponseErrorObject([{code: 'PROFILE_NOT_UPDATED'}], 'profile');
        }

    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'profile');
    })

}