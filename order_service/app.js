const express = require('express');
const app = express();
require('dotenv').config(); // Cargar variables de entorno
require('./src/database/index.db'); // Conectar a la base de datos

// Importar las rutas de 'ordenes'
const orderRoutes = require('./src/routes/order.route');

// Middleware para parsear JSON
app.use(express.json());

// Configurar las rutas para 'ordenes'
app.use('/api/ordenes', orderRoutes);

// Iniciar el servidor en el puerto 3002
app.listen(3002, () => {
    console.log('Servidor en http://localhost:3002');
});


//http://localhost:3002/api/ordenes