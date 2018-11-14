var _ = require('lodash');

var modules = [
	'profile',
	'members'
];

function init() {
	var app = {};

	_.each( modules, module => {
		app[ module ] = require( './' + module );
	});

	return app;
}

module.exports = init();