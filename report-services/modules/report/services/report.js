var _                 = require('lodash');
var   reportEntities  = require('../entities/reports');
var   Report          = reportEntities.entity;
var   repo            = reportEntities.repo;
var   message         = require('../messages');
var   responseHelper  = require('../../utilities/helper');
var   uploadFile	  = reportEntities.uploadFile;

module.exports = {

	/**
	 * Add a report
	 *
	 * @method add
	 * @param  {uuid} 	patient
	 * @param  {string} originalname
	 * @param  {string} mimetype
	 * @param  {string} filename
	 * @param  {string} path
	 * @param  {integer}size
	 * @return {promise}
	 */
	add : (originalname, mimetype, filename, path, size, patient) =>	repo.add(originalname, mimetype, filename, path, size, patient)
	.then( resolved => {
		return responseHelper.createResponseSuccessObject({code: 'ADDED_SUCCESSFULLY'}, 'report', resolved);                
    }, rejected => {
    	return responseHelper.createResponseErrorObject(rejected, 'report');
    }),

	/**
	 * Update a report
	 *
	 * @method update
	 * @param  {uuid}	id
	 * @param  {uuid} 	patient
	 * @param  {string} originalname
	 * @param  {string} mimetype
	 * @param  {string} filename
	 * @param  {string} path
	 * @param  {integer}size
	 * @return {promise}
	 */
	update : (id, originalname, mimetype, filename, path, size, patient) => repo.update(id, originalname, mimetype, filename, path, size, patient)
	.then( resolved => {
		return responseHelper.createResponseSuccessObject({code: 'UPDATED_SUCCESSFULLY'}, 'report', resolved);                
    }, rejected => {
    	return responseHelper.createResponseErrorObject(rejected, 'report');
    }),

	/**
	 * Get report by id
	 *
	 * @method getById
	 * @param  {uuid} id
	 * @return {promise}
	 */
	getById : id => repo.getById(id)
	.then( resolved => {
		return responseHelper.createResponseSuccessObject('', 'report', resolved);                
    }, rejected => {
    	return responseHelper.createResponseErrorObject(rejected, 'report');
    }),

	/**
	 * Get report by patient
	 *
	 * @method getByPatientId
	 * @param  {uuid} patient
	 * @return {promise}
	 */
    getByPatientId : patient => repo.getByPatientId(patient)
	.then( resolved => {
		return responseHelper.createResponseSuccessObject('', 'report', resolved);                
    }, rejected => {
    	return responseHelper.createResponseErrorObject(rejected, 'report');
    }),
}