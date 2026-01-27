const express = require('express');
const app = express();
require('dotenv').config();
require('./src/database/index.db');

const userRoutes = require('./src/routes/user.route');

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001');
});
//http://localhost:3001/api/users
// http://user_service:3001/api/users