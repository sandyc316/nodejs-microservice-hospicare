exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('patients', {
		id : { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		first_name : { type: 'varchar(128)', notNull: true},
		last_name  : { type: 'varchar(128)', default: '', notNull: false},
		email     : { type: 'varchar(128)', notNull: true, unique: true},
		phone     : { type: 'varchar(13)', notNull: true}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('patients');
};
