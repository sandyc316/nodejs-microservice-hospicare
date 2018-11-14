exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('appointment_at_hospitals', {
		id 				: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		party1			: { type: 'json'},
		party2 			: { type: 'json'},
		member 			: { type: 'uuid', 			notNull: false, default: null},
		patient			: { type: 'uuid', 			notNull: false},
		hospital		: { type: 'uuid', 			notNull: false},
		speciality 		: { type: 'varchar(128)', 	notNull: true },
		report			: { type: 'varchar(255)', 	notNull: false},
		description 	: { type: 'varchar(255)', 	notNull: false},
		reason			: { type: 'varchar(128)', 	notNull: false},
		status 			: { type: 'varchar(128)', 	notNull: true },
		fixed_by 		: { type: 'varchar(128)', 	notNull: true },
		start_at		: { type: 'timestamp', 		notNull: true },
		end_at			: { type: 'timestamp', 		notNull: false}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('appointment_at_hospitals');
};
