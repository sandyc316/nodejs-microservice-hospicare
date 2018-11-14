#!/bin/sh

DATABASE_URL=postgres://postgres:postgres@db:5432/familycare node node_modules/node-pg-migrate/bin/node-pg-migrate -m modules/profile/models/postgres/migrations/ -t profile_migration up
DATABASE_URL=postgres://postgres:postgres@db:5432/familycare node node_modules/node-pg-migrate/bin/node-pg-migrate -m modules/members/models/postgres/migrations/ -t member_migration up


exec "$@"