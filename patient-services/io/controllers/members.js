var express   = require('express'),
    router    = express.Router({mergeParams:true}),
    wrap      = require('co-express'),
    _         = require('lodash'),
    co        = require('co'),
    os        = require('os');

var memberService = require('../../modules/members/services/member');

router.post('/', wrap(function* (req, res, next) {

    try {
        
        var result = yield memberService.addMember(req.body.firstName, req.body.lastName, req.body.relationship, req.params.id);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.get('/', wrap(function* (req, res, next) {

    try {
        console.log("Patient id to get members is ", req.params.id);
        var result = yield memberService.getMembersByPatientId(req.params.id);
        console.log("Members controller result ", result);
        return res.json(result);

    } catch (e) {
        console.log("Exception in getting members for patient", e);
        return next(e);
    }

}));

router.get('/:memberId', wrap(function* (req, res, next) {

    try {
        
        var result = yield memberService.getMemberById(req.params.memberId);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.post('/:memberId/medical', wrap(function* (req, res, next) {
    
    try {

        var result = yield memberService.createMedicalProfile(req.params.id, req.params.memberId, req.body.gender, req.body.birthDate, req.body.bloodGroup, req.body.height, req.body.weight, req.body.allergies, req.body.medicalHistory);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));

router.post('/:memberId', wrap(function* (req, res, next) {

    try {
        
        var result = yield memberService.updateMemberById(req.params.memberId, req.params.id, req.body.firstName, req.body.lastName, req.body.relationship);
        return res.json(result);

    } catch (e) {
        return next(e);
    }

}));


module.exports = router;