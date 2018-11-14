#!/bin/sh

DATABASE_URL=postgres://postgres:postgres@db:5432/familycare node node_modules/node-pg-migrate/bin/node-pg-migrate -m modules/booking/models/postgres/migrations/ -t booking_migration up


exec "$@"