const { Pool } = require('pg');

const pool = new Pool({
    host: 'monorail.proxy.rlwy.net',
    port: 56532,
    user: 'postgres',
    password: 'oteNJhOlBVzwuBUbfjlkmIzYIQcHnKdf',
    database: 'railway'
});

module.exports = pool;
