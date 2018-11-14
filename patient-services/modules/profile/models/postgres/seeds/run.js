var config     = require('../../../../cfg'),
    _          = require('lodash'),
    co         = require('co'),
    model      = require('./seedModel');


var seedModel = new model();

co(function* () {
    try {
        // Seed patients
        res = yield seedModel.patients();

    } catch (e) {
        throw e;
    }
})();
