exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.addColumn('patients', {
		medical_profile : { type: 'json'}
		
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropColumns('patients', medical_profile);
};