exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('doctor_at_homes', {
		id 				: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		party1			: { type: 'json'},
		party2 			: { type: 'json'},
		member 			: { type: 'uuid', 			notNull: false, default: null},
		patient			: { type: 'uuid', 			notNull: false},
		doctor			: { type: 'uuid', 			notNull: false},
		speciality 		: { type: 'varchar(128)', 	notNull: true },
		emergency		: { type: 'boolean', 		notNull: false, default: false},
		address 		: { type: 'uuid', 			notNull: false},
		report			: { type: 'varchar(255)', 	notNull: false},
		description 	: { type: 'varchar(255)', 	notNull: false},
		reason			: { type: 'varchar(128)', 	notNull: false},
		status 			: { type: 'varchar(128)', 	notNull: true },
		fixed_by 		: { type: 'varchar(128)', 	notNull: true },
		prescriptions	: { type: 'varchar(128)', 	notNull: false},
		follow_up		: { type: 'uuid', 			notNull: false, default: null},
		follow_status	: { type: 'varchar(128)', 	notNull: false},
		type			: { type: 'varchar(128)', 	notNull: false},
		start_at		: { type: 'timestamp', 		notNull: true },
		end_at			: { type: 'timestamp', 		notNull: false}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('doctor_at_homes');
};
