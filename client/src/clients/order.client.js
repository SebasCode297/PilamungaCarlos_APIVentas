const axios = require('axios');
require('dotenv').config();

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';

/**
 * Cliente para comunicarse con el servicio de órdenes
 */
class OrderClient {
    /**
     * Verifica si un producto está en alguna orden
     * @param {number} id_producto - ID del producto a verificar
     * @returns {Promise<boolean>} - true si está en órdenes, false si no
     */
    static async isProductInOrders(id_producto) {
        try {
            const response = await axios.get(`${ORDER_SERVICE_URL}/api/ordenes`);
            const orders = response.data || [];
            
            // Necesitamos verificar los detalles de cada orden
            for (const order of orders) {
                try {
                    const orderDetail = await axios.get(`${ORDER_SERVICE_URL}/api/ordenes/${order.id_order}`);
                    if (orderDetail.data && orderDetail.data.detalle) {
                        const hasProduct = orderDetail.data.detalle.some(
                            detalle => detalle.producto_id === id_producto
                        );
                        if (hasProduct) return true;
                    }
                } catch (err) {
                    // Continuar con la siguiente orden si hay error
                    continue;
                }
            }
            return false;
        } catch (error) {
            // Si no se puede conectar, asumimos que no está en órdenes
            if (error.code === 'ECONNREFUSED') {
                console.warn('No se puede conectar con el servicio de órdenes. Se permite la eliminación.');
                return false;
            }
            throw new Error(`Error al verificar órdenes del producto: ${error.message}`);
        }
    }
}

module.exports = OrderClient;

