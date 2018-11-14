exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('addresses', {
		id 	: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		lat : { type: 'varchar(128)'},
		lng : { type: 'varchar(128)'},
		address : { type: 'varchar(128)', notNull: true},
		street : { type: 'varchar(128)'},
		locality : { type: 'varchar(128)'},
		city : { type: 'varchar(128)', notNull: true},
		zipcode : { type: 'varchar(128)', notNull: true},
		state : { type: 'varchar(128)', notNull: true},
		country : { type: 'varchar(128)', notNull: true},
		tag : { type: 'varchar(128)', notNull: true},
		user_id : { type: 'uuid', notNull: true}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('addresses');
};
