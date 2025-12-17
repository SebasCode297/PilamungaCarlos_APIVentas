const axios = require('axios');
require('dotenv').config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

/**
 * Cliente para comunicarse con el servicio de usuarios
 */
class UserClient {
    /**
     * Valida que un usuario exista en el servicio de usuarios
     * @param {number} id_usuario - ID del usuario a validar
     * @returns {Promise<Object>} - Datos del usuario si existe
     * @throws {Error} - Si el usuario no existe o hay un error en la comunicación
     */
    static async validateUser(id_usuario) {
        try {
            const response = await axios.get(`${USER_SERVICE_URL}/api/users/${id_usuario}`);
            if (response.data && response.data.id_usuario) {
                return response.data;
            }
            throw new Error('El usuario no existe');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('El usuario no existe');
            }
            if (error.code === 'ECONNREFUSED') {
                throw new Error('No se puede conectar con el servicio de usuarios. Verifique que esté ejecutándose.');
            }
            throw new Error(`Error al validar usuario: ${error.message}`);
        }
    }
}

module.exports = UserClient;

