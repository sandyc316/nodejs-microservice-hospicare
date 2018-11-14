var cfg        = require('config');

var _          = require('lodash');
var multer     = require('multer');

var modelFactory = require('../models').modelFactory;
var reportModel = modelFactory.getModel('reports', cfg, "postgres");


/*
    @class Report
    @constructor
*/
class Report {
    
    constructor() {
    }

};

/*
    @Desc   Communicates with model to perform database opetations
    @var    repo
*/
var repo = {

    /**
     * Get a report by id
     *
     * @method getById
     * @param {uuid} id
     * @return {Promise} 
     */
    getById : id => {
        return new Promise( (resolve, reject) => {
            
            reportModel.getById(id)
            .then ( report => {
                return resolve(report);
            }, rejected => {
                return reject(rejected);
            });

        });
    },
    
    /**
     * Get a report by patient id
     *
     * @method getByPatientId
     * @param {uuid} patient
     * @return {Promise} 
     */
    getByPatientId : patient => {
        return new Promise( (resolve, reject) => {
            
            reportModel.getByPatientId(patient)
            .then ( report => {
                return resolve(report);
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Create a report
     *
     * @method add
     * @param {uuid}    patient
     * @param {string}  report
     * @return {Promise} 
     */
    add : (originalname, mimetype, filename, path, size, patient) => {
        return new Promise( (resolve, reject) => {

            reportModel.add(originalname, mimetype, filename, path, size, patient)
            .then( report => {
                return resolve(report);
            }, rejected => {
                return reject(rejected);
            });

        });
    },

    /**
     * Update a report
     *
     * @method update
     * @param {uuid}    id
     * @param {string}  report
     * @return {Promise}  
     */
    update : (id, originalname, mimetype, filename, path, size, patient) => {
        return new Promise( (resolve, reject) => {

            reportModel.update(id, originalname, mimetype, filename, path, size, patient)
            .then( report => {
                return resolve(report);
            }, rejected => {
                return reject(rejected);
            });

        });
    },

}

function uploadFile(report) {

    return new Promise( (resolve, reject) => {
        console.log('inside entity file', report)
        var uploadImg = multer().single('report');

        console.log('multer is', uploadImg);

        uploadImg(report, {}, function (error) {
            if (error) {
                console.log('error from multer is', error);
                return reject([{code: 'INVALID_REPORT'}]);
            } else {
                return resolve(report.path);
            }
        });
        
    });
}

module.exports = {
    'entity': Report,
    'repo': repo,
    'uploadFile': uploadFile
}