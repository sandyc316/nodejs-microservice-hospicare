var express   = require('express'),
    router    = express.Router(),
    wrap      = require('co-express'),
    _         = require('lodash'),
    co        = require('co'),
    os        = require('os');

router.get('/', wrap(function* (req, res, next) {
    try {

        var hostname = os.hostname();

        return res.json({
            title: "Doctors home",
            hostname: hostname
        });

    } catch (e) {
        return next(e);
    }
}));

module.exports = router;