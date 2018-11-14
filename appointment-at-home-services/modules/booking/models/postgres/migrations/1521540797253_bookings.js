exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('bookings', {
		id 				: { type: 'uuid', 			primaryKey: true, default: pgm.func('gen_random_uuid()')},
		patient 		: { type: 'uuid', 			notNull: true},
		member  		: { type: 'uuid', 			notNull: false},
		address     	: { type: 'uuid', 			notNull: true},
		speciality 		: { type: 'varchar(128)' , 	notNull: true},
		reason 			: { type: 'varchar(128)', 	notNull: true},
		date  			: { type: 'timestamp', 		notNull: true},
		start_at		: { type: 'timestamp', 		notNull: true},
		end_at			: { type: 'timestamp', 		notNull: true}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('bookings');
};
