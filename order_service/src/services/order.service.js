const repo = require("../repositories/order.repository");

// Obtener todas las órdenes
exports.getAll = async () => {
    return repo.getAll(); // Llamada a la función getAll del repositorio
};

// Obtener una orden por ID
exports.getById = async (id) => {
    return repo.getById(id);
};

// Crear una nueva orden
exports.create = async (id_usuario) => {
    // Validamos que el ID del usuario sea válido
    if (!id_usuario) throw new Error("El ID del usuario es obligatorio");
    
    return repo.createOrder(id_usuario);
};

// Añadir productos a la orden
exports.addDetalle = async (id_order, productos) => {
    if (!Array.isArray(productos)) throw new Error("Los productos deben ser un arreglo");
    
    // Usar for...of en lugar de forEach para manejar correctamente las promesas async
    for (const producto of productos) {
        await repo.addDetalle(id_order, producto.id_producto, producto.cantidad, producto.precio_unitario);
    }
};

// Actualizar el total de la orden
exports.updateTotal = async (id_order, total) => {
    return repo.updateTotal(id_order, total);
};

// Actualizar una orden
exports.update = async (id, data) => {
    return repo.update(id, data);
};

// Eliminar una orden
exports.delete = async (id) => {
    return repo.delete(id);
};
