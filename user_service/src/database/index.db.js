const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.connect()
    .then(client => {
        console.log('Excelente ve vas por buen camino se conecto a base de datos');
        client.release();
    })
    .catch(err => {
        console.error('Error algo tan facil no puedes, no se conecto ve', err);
    });

module.exports = pool;

