const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Prince@1981',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;
