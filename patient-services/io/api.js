var app        = require('./common'),
    wrap       = require('co-express'),
    //logging    = require('./logger'),
    wrap       = require('co-express'),
    _          = require('lodash'),
    session    = require('express-session'),
    fs         = require('fs');;


// app.use(logging.init);
// app.set('logger', new logging.Logger({
//     'subdomain': app.get('config').api.logging.loggly.subdomain,
//     'token'    : app.get('config').api.logging.loggly.token,
//     'tags'     : app.get('config').api.logging.loggly.tags,
//     'file'     : app.get('config').api.logging.file
// }));


//
// PUT HANDLERS HERE.
// common routes
require('./routes')(app);
// END OF HANDLERS

// 404 handler
app.use(function (req, res, next) {
    // if (!res.api.data) {
    //     var err404 = new Error('Not found');
    //     err404.status = 404;
    //     return next(err404);
    // }

    next();
});


var knownErrs   = {
    401: {
        'code' : 'unauthorized',
        'title': 'Authentication credentials were missing or incorrect'
    },

    403: {
        'code' : 'forbidden',
        'title': 'You are not authorized to make this request'
    },

    404: {
        'code' : 'notfound',
        'title': 'Unable to locate requested resource'
    },
};

// This error handler prepares an error response (but doesn't send it yet)
app.use(function (err, req, res, next) {
    // If the error status matches one in the dictionary above, add
    // it to the error list
    console.log('Error in patient api.js', err.stack);
    res.api.errors.unshift(knownErrs[err.status] || {
        'code': 'internal_err',
        'title': 'Something wen\'t wrong while trying to serve the request'
    }); // add error to errors array

    // Similarly set the response status
    res.status(knownErrs[err.status] ? err.status : 500);

    next(err);
});

// This error handler logs the error
app.use(function (err, req, res, next) {
    req.app.get('logger')[knownErrs[err.status] ? 'warn' : 'error'](
        err.status || 500,
        knownErrs[err.status] ? knownErrs[err.status].code : 'internal_err',
        {'reqid': req.minidata.reqid },
        {
            'stack': err.stack
        }
    );

    next(err);
});

// This error handler prints the error response
app.use(function (err, req, res, next) {
    if (!err) {
        return next();
    }

});



app.listen(app.get('config').app.port);
console.log('Listening on port %s', app.get('config').app.port);
//app.get('logger').info('Listening on port %s', app.get('config').api.port);
