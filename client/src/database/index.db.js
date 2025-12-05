// src/database/index.db.js
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
        console.log('Conectado a la base de datos PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos PostgreSQL', err);
    });

module.exports = pool;
