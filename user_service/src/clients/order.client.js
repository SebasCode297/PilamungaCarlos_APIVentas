const axios = require('axios');
require('dotenv').config();

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';

/**
 * Cliente para comunicarse con el servicio de órdenes
 */
class OrderClient {
    /**
     * Verifica si un usuario tiene órdenes asociadas
     * @param {number} id_usuario - ID del usuario a verificar
     * @returns {Promise<boolean>} - true si tiene órdenes, false si no
     */
    static async hasOrders(id_usuario) {
        try {
            const response = await axios.get(`${ORDER_SERVICE_URL}/api/ordenes`);
            const orders = response.data || [];
            return orders.some(order => order.id_usuario === id_usuario);
        } catch (error) {
            // Si no se puede conectar, asumimos que no hay órdenes para no bloquear la eliminación
            // En producción, podrías querer lanzar el error
            if (error.code === 'ECONNREFUSED') {
                console.warn('No se puede conectar con el servicio de órdenes. Se permite la eliminación.');
                return false;
            }
            throw new Error(`Error al verificar órdenes del usuario: ${error.message}`);
        }
    }
}

module.exports = OrderClient;

