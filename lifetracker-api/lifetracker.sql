\echo 'You are about to delete the lifetracker database and recreate it. Are you sure?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker

\i lifetracker-schema.sql
