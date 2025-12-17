const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

// Ruta para obtener todas las órdenes
router.get('/', controller.getOrders);

// Ruta para obtener una orden por ID
router.get('/:id', controller.getOrderById);

// Ruta para crear una nueva orden
router.post('/', controller.createOrders);

// Ruta para actualizar una orden existente
router.put('/:id', controller.updateOrders);

// Ruta para eliminar una orden
router.delete('/:id', controller.deleteOrders);

module.exports = router;
