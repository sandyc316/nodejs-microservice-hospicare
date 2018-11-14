var RBAC2 = require('rbac2'),
    _     = require('lodash'),
    req, res, next, rules;

function check(permission, params) {
    // params length
    if (arguments.length === 1) {
        params   = {};
    }

    return function (callback) {
        var defaultParams = {};

        // default role is guest
        var role = 'guest';

        // get role
        if (req.user && req.user.r) {
            role               = req.user.r;
            defaultParams.user = req.user;
        }

        // delegate to rbac2
        var rbac = new RBAC2(rules);
        rbac.check(role, permission, _.extend(defaultParams, params), callback);
    };
}

function checkFatal(permission, params) {
    // params length
    if (arguments.length === 1) {
        params   = {};
    }

    return function (callback) {
        check(permission, params)(function (err, result) {
            if (err) {
                return next(err);
            }
            
            if (!result) {
                var err403 = new Error('Forbidden');
                err403.status = 403;
                return next(err403);
            }

            callback();
        });
    };
}

function init(_rules) {
    rules = _rules;

    return function (_req, _res, _next) {
        req = _req;
        res = _res;
        next = _next;
        req.rbac = {
            'check': check,
            'checkFatal': checkFatal
        };

        next();
    };
}

module.exports = init;
