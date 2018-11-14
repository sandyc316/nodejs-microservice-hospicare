var express   = require('express'),
    router    = express.Router(),
    wrap      = require('co-express'),
    _         = require('lodash'),
    co        = require('co'),
    os        = require('os'),
    multer 	  = require('multer')
    config 	  = require('config');

var reportService = require('../../modules/report/services/report');
var rabbitService   = require('../../modules/report/services/rabbit');

var storage = multer.diskStorage({
	destination: ( req, file, cb) => {
		cb(null,  __dirname + config.paths.tmp);
	},
	filename: (req, file, cb) => {
		cb( null, file.fieldname + '-' + Date.now() + ".jpg");
	}
});

var upload = multer({ storage: storage }).single('report');

router.post('/', wrap(function* (req, res, next) {

    try {
    	upload(req, res, function (err) {
			
			if (err) {
				return res.json(err);
			} else {
				reportService.add(req.file.originalname, req.file.mimetype, req.file.filename, req.file.path, req.file.size, req.body.patient)
				.then( resolved => {
					return res.json(resolved);	
				}, rejected => {
					return res.json(rejected);
				});
			}
		});

    } catch (e) {
        return next(e);
    }

}));

router.post('/:id', wrap(function* (req, res, next) {
    
    try {
    	upload(req, res, function (err) {
			
			if (err) {
				return res.json(err);
			} else {
				reportService.update(req.params.id, req.file.originalname, req.file.mimetype, req.file.filename, req.file.path, req.file.size, req.body.patient)
				.then( resolved => {
					return res.json(resolved);	
				}, rejected => {
					return res.json(rejected);
				});
			}
		});

    } catch (e) {
        return next(e);
    }

}));

router.get('/:id', wrap(function* (req, res, next) {
    
    try {

    	var resp = yield reportService.getById(req.params.id);
        return res.json(resp);

    } catch (e) {
        return next(e);
    }

}));

router.get('/:patient/patient', wrap(function* (req, res, next) {
    
    try {

    	var resp = yield reportService.getByPatientId(req.params.patient);
        return res.json(resp);

    } catch (e) {
        return next(e);
    }

}));

module.exports = router;
