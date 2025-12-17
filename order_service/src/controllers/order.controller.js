const service = require('../services/order.service');

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const data = await service.getAll();  // Llamamos al servicio que usa la función getAll del repositorio
        res.json(data);  // Devolvemos las órdenes
    } catch (err) {
        res.status(400).json({ error: err.message });  // Si hay algún error, lo capturamos y respondemos con el error
    }
};

// Obtener una orden por ID con sus detalles
exports.getOrderById = async (req, res) => {
    try {
        const order = await service.getById(req.params.id); // Llamamos al servicio para obtener la orden por ID
        order ? res.json(order) : res.status(404).json({ error: "Orden no encontrada" });
    } catch (err) {
        res.status(400).json({ error: err.message });  // Manejo de errores
    }
};

// Crear una nueva orden (con detalles)
exports.createOrders = async (req, res) => {
    try {
        const { id_usuario, productos } = req.body;

        // Validamos que el ID del usuario esté presente
        if (!id_usuario) throw new Error("El ID del usuario es obligatorio");

        // Creamos la orden
        const newOrder = await service.create(id_usuario); // El cuerpo debe contener id_usuario

        // Validamos que haya productos para agregar en la orden
        if (!productos || productos.length === 0) {
            throw new Error("La orden debe tener al menos un producto");
        }

        // Añadimos los productos a la orden
        await service.addDetalle(newOrder.id_order, productos);
        
        // Calculamos el total
        let total = 0;
        for (let producto of productos) {
            total += producto.cantidad * producto.precio_unitario;
        }

        // Actualizamos el total de la orden
        await service.updateTotal(newOrder.id_order, total);

        // Respondemos con la orden creada
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ error: err.message }); // Manejo de errores
    }
};

// Actualizar una orden existente
exports.updateOrders = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body); // Actualiza la orden por id_order
        res.json(updated); // Respondemos con la orden actualizada
    } catch (err) {
        res.status(400).json({ error: err.message }); // Manejo de errores
    }
};

// Eliminar una orden
exports.deleteOrders = async (req, res) => {
    try {
        const result = await service.delete(req.params.id); // Elimina la orden por id_order
        res.json(result); // Respondemos con el resultado de la eliminación
    } catch (err) {
        res.status(400).json({ error: err.message }); // Manejo de errores
    }
};
