exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.addColumn('members', {
		medical_profile : { type: 'json'}
		
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropColumns('members', medical_profile);
};