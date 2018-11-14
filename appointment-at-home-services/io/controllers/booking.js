var express   = require('express'),
    router    = express.Router(),
    wrap      = require('co-express'),
    _         = require('lodash'),
    co        = require('co'),
    os        = require('os');

var bookingService = require('../../modules/booking/services/booking');

router.post('/', wrap(function* (req, res, next) {
    
    try {

    	var resp = yield bookingService.create(req.body.patient, req.body.member, req.body.address, req.body.speciality, req.body.reason, req.body.startAt, req.body.endAt, req.body.emergency, req.body.reports, req.body.description, req.body.status, req.body.fixedBy, req.body.prescriptions, req.body.followStatus, req.body.type, req.body.followBy)
        res.json(resp);

    } catch (e) {
        return next(e);
    }

}));

module.exports = router;