#!/bin/sh

DATABASE_URL=postgres://postgres:postgres@db:5432/familycare node node_modules/node-pg-migrate/bin/node-pg-migrate -m modules/appointment_at_hospital/models/postgres/migrations/ -t appointment_at_hospital_migration up
DATABASE_URL=postgres://postgres:postgres@db:5432/familycare node node_modules/node-pg-migrate/bin/node-pg-migrate -m modules/doctor_at_home/models/postgres/migrations/ -t doctor_at_home_migration up

exec "$@"
