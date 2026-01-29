const express = require('express');
const app = express();
require('dotenv').config();
require('./src/database/index.db'); 

const orderRoutes = require('./src/routes/order.route');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Órdenes funcionando correctamente ');
});

app.use('/api/ordenes', orderRoutes);

app.listen(3002, () => {
    console.log('Servidor en http://localhost:3002');
});



//http://localhost:3002/api/ordenes