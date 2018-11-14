var express   = require('express'),
    router    = express.Router(),
    wrap      = require('co-express'),
    _         = require('lodash'),
    co        = require('co'),
    os        = require('os');

var profileService = require('../../modules/profile/services/profile');

router.get('/', wrap(function* (req, res, next) {

    try {
        var result = yield profileService.getById(req.query.id);
        return res.json(result);
        
    } catch (e) {
        return next(e);
    }

}));

router.post('/', wrap(function* (req, res, next) {
    
    try {
        var result = yield profileService.createProfile(req.body.firstName, req.body.lastName, req.body.email, req.body.phone);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.post('/:id/medical', wrap(function* (req, res, next) {
    
    try {

        var result = yield profileService.createMedicalProfile(req.params.id, req.body.gender, req.body.birthDate, req.body.bloodGroup, req.body.height, req.body.weight, req.body.allergies, req.body.medicalHistory);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.post('/:id/address', wrap(function* (req, res, next) {
    
    try {

        var result = yield profileService.addUserAddress(req.params.id, req.body.lat, req.body.lng, req.body.address, req.body.street, req.body.locality, req.body.city, req.body.zipcode, req.body.state, req.body.country, req.body.tag);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.post('/:id/address/:addressId', wrap(function* (req, res, next) {
    
    try {

        var result = yield profileService.updateUserAddress(req.params.id,req.params.addressId, req.body.lat, req.body.lng, req.body.address, req.body.street, req.body.locality, req.body.city, req.body.zipcode, req.body.state, req.body.country, req.body.tag);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.get('/:id/addresses', wrap(function* (req, res, next) {
    
    try {

        var result = yield profileService.getAddressByUserId(req.params.id);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.get('/:id/updated', wrap(function* (req, res, next) {
    
    try {

        var result = yield profileService.isProfileUpdated(req.params.id);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));


module.exports = router;