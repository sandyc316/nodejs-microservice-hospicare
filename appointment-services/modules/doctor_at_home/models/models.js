var _ = require('lodash');

var repoTypes = [
	'postgres',
	'mongo'
];

var models = {
	'postgres' : 	[
		'doctor_at_homes'
	],

	'mongo' : [
	]
};

function init() {
	var app = {};

	_.each( repoTypes, repoType => {
		app[repoType] = {};
		
		_.each( models[repoType], model => {
			app[repoType][ model ] = require( './' + repoType + '/' + model );
		});
	});
	

	return app;
}

module.exports = init();