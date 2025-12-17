const repo = require("../repositories/order.repository");
const ProductClient = require("../clients/product.client");

// Constantes para límites de negocio
const MAX_PRODUCTOS_POR_ORDEN = 20;
const MAX_CANTIDAD_POR_PRODUCTO = 100;
const ESTADOS_PERMITIDOS = ['CREADA', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'];

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
    // ========== VALIDACIONES ==========
    // 1. Validar que el ID del usuario sea válido
    if (!id_usuario) throw new Error("El ID del usuario es obligatorio");
    
    // 2. Validar que el ID del usuario sea un número
    if (isNaN(id_usuario) || id_usuario <= 0) {
        throw new Error("El ID del usuario debe ser un número positivo");
    }
    
    return repo.createOrder(id_usuario);
};

// Añadir productos a la orden
exports.addDetalle = async (id_order, productos) => {
    // ========== VALIDACIONES ==========
    // 1. Validar que productos sea un arreglo
    if (!Array.isArray(productos)) throw new Error("Los productos deben ser un arreglo");
    
    // 2. Validar que haya al menos un producto
    if (productos.length === 0) {
        throw new Error("La orden debe tener al menos un producto");
    }
    
    // 3. Validar que no se exceda el máximo de productos por orden
    if (productos.length > MAX_PRODUCTOS_POR_ORDEN) {
        throw new Error(`No se pueden agregar más de ${MAX_PRODUCTOS_POR_ORDEN} productos por orden`);
    }
    
    // 4. Validar que cada producto tenga los campos requeridos
    for (const producto of productos) {
        if (!producto.id_producto) {
            throw new Error("Cada producto debe tener un id_producto");
        }
        if (producto.cantidad === undefined || producto.cantidad === null) {
            throw new Error("Cada producto debe tener una cantidad");
        }
        if (producto.precio_unitario === undefined || producto.precio_unitario === null) {
            throw new Error("Cada producto debe tener un precio_unitario");
        }
    }
    
    // 5. Validar que las cantidades sean números positivos
    for (const producto of productos) {
        if (typeof producto.cantidad !== 'number' || producto.cantidad <= 0) {
            throw new Error("La cantidad debe ser un número positivo");
        }
        if (!Number.isInteger(producto.cantidad)) {
            throw new Error("La cantidad debe ser un número entero");
        }
        if (producto.cantidad > MAX_CANTIDAD_POR_PRODUCTO) {
            throw new Error(`La cantidad no puede exceder ${MAX_CANTIDAD_POR_PRODUCTO} unidades por producto`);
        }
        
        if (typeof producto.precio_unitario !== 'number' || producto.precio_unitario <= 0) {
            throw new Error("El precio_unitario debe ser un número positivo");
        }
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. Validar que la cantidad no exceda el stock disponible del producto
    for (const producto of productos) {
        const productData = await ProductClient.getProduct(producto.id_producto);
        if (producto.cantidad > productData.stock) {
            throw new Error(`No hay suficiente stock para el producto ${productData.nombre}. Stock disponible: ${productData.stock}`);
        }
    }
    
    // 2. Validar que no se agreguen productos duplicados en la misma orden
    const productosIds = productos.map(p => p.id_producto);
    const productosUnicos = new Set(productosIds);
    if (productosIds.length !== productosUnicos.size) {
        throw new Error("No se pueden agregar productos duplicados en la misma orden");
    }
    
    // 3. Validar que el precio_unitario coincida con el precio del producto (con margen de error de 0.01)
    for (const producto of productos) {
        const productData = await ProductClient.getProduct(producto.id_producto);
        const precioProducto = parseFloat(productData.precio);
        const precioEnviado = parseFloat(producto.precio_unitario);
        const diferencia = Math.abs(precioProducto - precioEnviado);
        
        if (diferencia > 0.01) {
            throw new Error(`El precio del producto ${productData.nombre} (${precioProducto}) no coincide con el precio enviado (${precioEnviado})`);
        }
    }
    
    // 4. Validar que no se pueda crear una orden con total 0
    let totalCalculado = 0;
    for (const producto of productos) {
        totalCalculado += producto.cantidad * producto.precio_unitario;
    }
    if (totalCalculado <= 0) {
        throw new Error("El total de la orden debe ser mayor a cero");
    }
    
    // 5. Usar for...of en lugar de forEach para manejar correctamente las promesas async
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
    // ========== VALIDACIONES ==========
    // 1. Validar que haya al menos un campo para actualizar
    if (!data.id_usuario && !data.estado && data.total === undefined) {
        throw new Error("Debe proporcionar al menos un campo para actualizar");
    }
    
    // 2. Validar formato de estado si se proporciona
    if (data.estado !== undefined) {
        if (typeof data.estado !== 'string') {
            throw new Error("El estado debe ser una cadena de texto");
        }
        if (!ESTADOS_PERMITIDOS.includes(data.estado.toUpperCase())) {
            throw new Error(`El estado debe ser uno de: ${ESTADOS_PERMITIDOS.join(', ')}`);
        }
        data.estado = data.estado.toUpperCase();
    }
    
    // 3. Validar que el total sea un número positivo si se proporciona
    if (data.total !== undefined) {
        if (typeof data.total !== 'number' || data.total < 0) {
            throw new Error("El total debe ser un número positivo o cero");
        }
    }
    
    // 4. Validar que el ID de usuario sea válido si se proporciona
    if (data.id_usuario !== undefined) {
        if (isNaN(data.id_usuario) || data.id_usuario <= 0) {
            throw new Error("El ID del usuario debe ser un número positivo");
        }
    }
    
    // 5. Validar que la orden existe antes de actualizar
    const ordenExistente = await repo.getById(id);
    if (!ordenExistente) {
        throw new Error("La orden no existe");
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. No permitir modificar órdenes completadas
    if (ordenExistente.estado === 'COMPLETADA') {
        throw new Error("No se puede modificar una orden completada");
    }
    
    // 2. No permitir cambiar el estado a COMPLETADA si el total es 0
    if (data.estado === 'COMPLETADA' && ordenExistente.total === 0) {
        throw new Error("No se puede completar una orden con total 0");
    }
    
    // 3. No permitir cambiar el estado a CANCELADA si ya está completada
    if (data.estado === 'CANCELADA' && ordenExistente.estado === 'COMPLETADA') {
        throw new Error("No se puede cancelar una orden completada");
    }
    
    // 4. Validar que el total calculado coincida (si se envía total)
    // Esta validación se puede hacer en el controlador si es necesario
    
    // 5. No permitir cambiar el usuario si la orden ya tiene productos
    if (data.id_usuario && data.id_usuario !== ordenExistente.id_usuario) {
        const ordenCompleta = await repo.getOrdenById(id);
        if (ordenCompleta.detalle && ordenCompleta.detalle.length > 0) {
            throw new Error("No se puede cambiar el usuario de una orden que ya tiene productos");
        }
    }
    
    return repo.update(id, data);
};

// Eliminar una orden
exports.delete = async (id) => {
    // ========== VALIDACIONES ==========
    // 1. Validar que la orden existe
    const ordenExistente = await repo.getById(id);
    if (!ordenExistente) {
        throw new Error("La orden no existe");
    }
    
    // ========== REGLA DE NEGOCIO ==========
    // No permitir eliminar órdenes completadas
    if (ordenExistente.estado === 'COMPLETADA') {
        throw new Error("No se puede eliminar una orden completada");
    }
    
    return repo.delete(id);
};
