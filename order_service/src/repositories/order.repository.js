const db = require('../database/index.db');
const UserClient = require('../clients/user.client');
const ProductClient = require('../clients/product.client');

// Obtener todas las órdenes
exports.getAll = async () => {
    const result = await db.query('SELECT * FROM "orders"');
    return result.rows;
};

// Obtener una orden por ID
exports.getById = async (id) => {
    const result = await db.query('SELECT * FROM "orders" WHERE id_order = $1', [id]);
    return result.rows[0];
};

// Crear una nueva orden
exports.createOrder = async (id_usuario) => {
    // Validar que el usuario existe mediante llamada HTTP al servicio de usuarios
    await UserClient.validateUser(id_usuario);

    const result = await db.query(
        'INSERT INTO "orders" (id_usuario, total, estado) VALUES ($1, 0, $2) RETURNING *',
        [id_usuario, 'CREADA']
    );
    return result.rows[0];  // Devolvemos la orden recién creada
};

// Añadir un detalle de producto en la orden
exports.addDetalle = async (id_order, productoId, cantidad, precio) => {
    // Validar que el producto existe mediante llamada HTTP al servicio de productos
    await ProductClient.validateProduct(productoId);
    
    await db.query(
        'INSERT INTO "orden_detalle" (order_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
        [id_order, productoId, cantidad, precio]
    );
};

// Actualizar el total de la orden
exports.updateTotal = async (id_order, total) => {
    await db.query(
        'UPDATE "orders" SET total=$1 WHERE id_order=$2',
        [total, id_order]
    );
};

// Obtener una orden por su id, con detalles asociados
exports.getOrdenById = async (id_order) => {
    const orden = await db.query(
        'SELECT * FROM "orders" WHERE id_order=$1',
        [id_order]
    );

    const detalle = await db.query(
        'SELECT * FROM "orden_detalle" WHERE order_id=$1',
        [id_order]
    );

    return {
        orden: orden.rows[0],  // La orden
        detalle: detalle.rows  // Los detalles de la orden
    };
};

// Actualizar el estado de la orden
exports.updateStatus = async (id_order, estado) => {
    const result = await db.query(
        'UPDATE "orders" SET estado=$1 WHERE id_order=$2 RETURNING *',
        [estado, id_order]
    );
    return result.rows[0];  // Devolvemos la orden actualizada
};

// Actualizar una orden
exports.update = async (id_order, data) => {
    // Validar que el usuario existe si se proporciona
    if (data.id_usuario) {
        await UserClient.validateUser(data.id_usuario);
    }
    
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (data.id_usuario !== undefined) {
        updates.push(`id_usuario = $${paramCount}`);
        values.push(data.id_usuario);
        paramCount++;
    }
    
    if (data.estado !== undefined) {
        updates.push(`estado = $${paramCount}`);
        values.push(data.estado);
        paramCount++;
    }
    
    if (data.total !== undefined) {
        updates.push(`total = $${paramCount}`);
        values.push(data.total);
        paramCount++;
    }
    
    if (updates.length === 0) {
        throw new Error('No hay campos para actualizar');
    }
    
    values.push(id_order);
    const query = `UPDATE "orders" SET ${updates.join(', ')} WHERE id_order = $${paramCount} RETURNING *`;
    
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar una orden
exports.delete = async (id_order) => {
    const result = await db.query(
        'DELETE FROM "orders" WHERE id_order = $1 RETURNING *',
        [id_order]
    );
    return result.rows[0];
};
