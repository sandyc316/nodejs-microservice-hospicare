var _ = require('lodash');

var modules = [
];

function init() {
	var app = {};

	_.each( modules, module => {
		app[ module ] = require( './' + module );
	});

	return app;
}

module.exports = init();