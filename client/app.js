const express = require('express');
const app = express();
require('dotenv').config();
require('./src/database/index.db');

const productRoutes = require('./src/routes/product.route');

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
//  http://localhost:3000/api/products