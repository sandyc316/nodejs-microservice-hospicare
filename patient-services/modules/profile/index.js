var _ = require('lodash');

var modules = [
    'profile'
];

function init() {
    var app = {};

    _.each( modules, module => {
		app[ module ] = require( './services/' + module );
	});
    
    return app;
}

module.exports = init();
