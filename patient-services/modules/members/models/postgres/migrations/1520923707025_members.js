exports.up = (pgm, run) => {
    // CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    pgm.createExtension( "pgcrypto" , {ifNotExists : true});

    pgm.createTable('members', {
        id 			: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
        first_name   : { type: 'varchar(128)', notNull: true},
        last_name    : { type: 'varchar(128)', default: '', notNull: false},
        relationship: { type: 'varchar(128)', notNull: true},
        patient     : { type: 'uuid', notNull: true}
    });

    run();
};

exports.down = (pgm) => {
    pgm.dropTable('members');
};