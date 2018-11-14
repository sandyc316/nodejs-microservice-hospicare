var express      = require('express'),
    morgan       = require('morgan'),
    helmet       = require('helmet'),
    bodyParser   = require('body-parser'),
    multer       = require('multer'),
    resTime      = require('response-time'),
    onHeaders    = require('on-headers'),
    config       = require('config'),
    app          = express(),
    fs           = require('fs'),
    path         = require('path');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').load();

// Set config
app.set('config', config);

// Set modules
app.set('modules', require('../modules'));

// Add X-Reponse-Time
app.use(resTime(5));

// make express aware that it's sitting behind a proxy, ie trust the X-Forwarded-* header
app.enable('trust proxy');

// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 300 }
}));


// Implement contentSecurityPolicy with Helmet
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ['*.google-analytics.com'],
        styleSrc: ["'unsafe-inline'"],
        imgSrc: ['*.google-analytics.com'],
        connectSrc: ["'none'"],
        /*fontSrc: [],
        objectSrc: [],
        mediaSrc: [],
        frameSrc: []*/    
    }
}));

// Implement X-XSS-Protection
app.use(helmet.xssFilter());

// Implement X-Frame: Deny
app.use(helmet.frameguard({ action: 'deny' }));

// Implement Strict-Transport-Security
app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubdomains: true
}));

// Hide X-Powered-By
app.use(helmet.hidePoweredBy({ setTo: 'Aranoah private limited' }));

// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff())

// Create a simple representation of request data
app.use(function (req, res, next) {
    req.minidata = {
        'method': req.method,
        'url'   : req.url,
        'query' : req.query,
        'body'  : req.body,
        'reqid' : 1,
        'ip'    : req.ip
    };

    next();
});


// Set req._data = {}
app.use(function (req, res, next) {
    req._data = {};
    next();
});

// Parse POST data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/static' ,express.static(path.join(__dirname, 'public')));


// init RBAC
app.use(require('./rbac')(config.rbacRules));


module.exports = app;
