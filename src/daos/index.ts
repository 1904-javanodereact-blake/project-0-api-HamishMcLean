import { Pool } from 'pg';

const config = {
  user: process.env['SHREK_DB_USERNAME'],
  host: process.env['SHREK_DB_URL'] || 'localhost',
  database: process.env['SHREK_DB_NAME'] || 'postgres',
  password: process.env['SHREK_DB_PASSWORD'],
  port: 5432,
  max: 5, // max number of connections this application will create
};

console.log(config);

export const connectionPool = new Pool(config);