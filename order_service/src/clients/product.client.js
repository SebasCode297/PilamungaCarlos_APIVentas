const axios = require('axios');
require('dotenv').config();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3000';

/**
 * Cliente para comunicarse con el servicio de productos
 */
class ProductClient {
    /**
     * Valida que un producto exista en el servicio de productos
     * @param {number} id_producto - ID del producto a validar
     * @returns {Promise<Object>} - Datos del producto si existe
     * @throws {Error} - Si el producto no existe o hay un error en la comunicación
     */
    static async validateProduct(id_producto) {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${id_producto}`);
            if (response.data && response.data.id) {
                return response.data;
            }
            throw new Error('El producto no existe');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('El producto no existe');
            }
            if (error.code === 'ECONNREFUSED') {
                throw new Error('No se puede conectar con el servicio de productos. Verifique que esté ejecutándose.');
            }
            throw new Error(`Error al validar producto: ${error.message}`);
        }
    }

    /**
     * Obtiene el precio de un producto
     * @param {number} id_producto - ID del producto
     * @returns {Promise<number>} - Precio del producto
     */
    static async getProductPrice(id_producto) {
        const product = await this.validateProduct(id_producto);
        return parseFloat(product.precio);
    }
}

module.exports = ProductClient;

