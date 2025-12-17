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
        console.log('Excelente, se conectó correctamente a la base de datos');
        client.release();
    })
    .catch(err => {
        console.error('Error al conectarse a la base de datos', err);
    });

module.exports = pool;
