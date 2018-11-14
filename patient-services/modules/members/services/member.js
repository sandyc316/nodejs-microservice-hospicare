var _                 = require('lodash');
var   memberEntities  = require('../entities/members');
var   Member          = memberEntities.entity;
var   repo            = memberEntities.repo;
var   message         = require('../messages');
var   responseHelper  = require('../../utilities/helper');

module.exports = {

    /**
     * Get member details by Id
     *
     * @method getById
     * @param  {uuid} id
     * @return {promise}
     */
    getById : id => repo.getById(id)
    .then ( resolved => {

        if(resolved && resolved != null) {
            return responseHelper.createResponseSuccessObject('', 'members', resolved);
        } else {
            return responseHelper.createResponseErrorObject([{code: 'MEMBER_NOT_FOUND'}], 'members');
        }

    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

    /**
     * add a new member
     * @param  {string} firstName
     * @param  {string} lastName 
     * @param  {string} relation 
     * @param  {uuid}   patient  
     * @return {promise}          
     */
    addMember : (firstName, lastName, relation, patient) => Member.validate(firstName, lastName, relation)
    .then( function(resolved) {
        
        return repo.add(firstName, lastName, relation, patient)
        .then(resolved => {
            return responseHelper.createResponseSuccessObject(resolved, 'members');
        }, rejected => {
            return responseHelper.createResponseErrorObject(rejected, 'members');
        });
        
    }, function(rejected) {
        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

    /**
     * Get member details by patient id
     *
     * @method getMembersByPatientId
     * @param  {uuid} patient
     * @return {promise}
     */
    getMembersByPatientId : patient => repo.getMembersByPatientId(patient)
    .then(resolved => {

        console.log("Members for patient " + patient + " ", resolved);
        return responseHelper.createResponseSuccessObject('', 'members', {members: resolved});
    }, rejected => {

        console.log("Error in members services", rejected);
        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

    /**
     * Get member details by id
     *
     * @method getMemberById
     * @param  {uuid} memberId
     * @return {promise}
     */
    getMemberById : memberId => repo.getMemberById(memberId)
    .then(resolved => {
        return responseHelper.createResponseSuccessObject('', 'members', resolved);
    }, rejected => {
        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

    /**
     * Create a medical profile of member
     *
     * @method createMedicalProfile
     * @param  {uuid} patient
     * @param  {uuid} memberId
     * @param  {bool} gender
     * @param  {timestamp} birthDate
     * @param  {string} bloodGroup
     * @param  {string} height
     * @param  {integer} weight
     * @param  {string} allergies
     * @param  {string} medicalHistory
     * @return {promise}
     */
    createMedicalProfile : (patient, memberId, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) => repo.getByPatientAndId(patient, memberId)
    .then( member => {

        if(member) {

            return repo.addMedicalProfile(patient, memberId, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory)
            .then( resolved => {

                return responseHelper.createResponseSuccessObject([{code: 'MEDICAL_PROFILE_ADDED_SUCCESSFULLY'}], 'members', resolved);
            }, rejected => {

                return responseHelper.createResponseErrorObject(rejected, 'members'); 
            });    
        } else {
            return responseHelper.createResponseErrorObject([{code: 'MEMBER_NOT_FOUND'}], 'members'); 
        }
        
    }, rejected => {

        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

    /**
     * update member details
     *
     * @method updateMemberById
     * @param  {uuid} memberId
     * @param  {uuid} patient
     * @param  {string} firstName
     * @param  {string} lastName
     * @param  {string} relationship
     * @return {promise}
     */
    updateMemberById : (memberId, patient, firstName, lastName, relationship) => repo.getByPatientAndId(patient, memberId)
    .then( member => {

        if(member) {

            return repo.updateMemberById(memberId, firstName, lastName, relationship)
            .then( resolved => {

                return responseHelper.createResponseSuccessObject({code: 'MEMBER_UPDATED_SUCCESSFULLY'}, 'members', resolved);
            }, rejected => {

                return responseHelper.createResponseErrorObject(rejected, 'members'); 
            });    
        } else {
            return responseHelper.createResponseErrorObject([{code: 'MEMBER_NOT_FOUND'}], 'members'); 
        }
        
    }, rejected => {

        return responseHelper.createResponseErrorObject(rejected, 'members');
    }),

}