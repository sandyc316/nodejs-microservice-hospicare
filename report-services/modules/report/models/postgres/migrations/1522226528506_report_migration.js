exports.up = (pgm, run) => {
	// CREATE EXTENSION IF NOT EXISTS "pgcrypto";

	pgm.createExtension( "pgcrypto" , {ifNotExists : true});

	pgm.createTable('reports', {
		id 			 : { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		patient	  	 : { type: 'uuid'		 , notNull: true},
		originalname : { type: 'varchar(128)', notNull: true},
		mimetype 	 : { type: 'varchar(128)', notNull: true},
		filename 	 : { type: 'varchar(128)', notNull: true},
		path 		 : { type: 'varchar(128)', notNull: true},
		size 		 : { type: 'integer'	 , notNull: true}
	});
	
	run();
};

exports.down = (pgm) => {
	pgm.dropTable('reports');
};
