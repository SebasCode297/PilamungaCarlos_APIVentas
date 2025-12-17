const repo = require('../repositories/product.repository');
const OrderClient = require('../clients/order.client');

exports.getAll = () => repo.getAll();

exports.getById = (id) => repo.getById(id);

// Constantes para límites de negocio
const MAX_PRECIO = 999999.99;
const MAX_STOCK = 10000;
const MAX_NOMBRE_LENGTH = 100;
const MAX_DESCRIPCION_LENGTH = 500;

exports.create = async (product) => {
    // ========== VALIDACIONES ==========
    // 1. Validar campos obligatorios
    if (!product.nombre) throw new Error("El nombre del producto es obligatorio");
    if (!product.descripcion) throw new Error("La descripcion del producto es obligatoria");
    if (product.stock === undefined || product.stock === null) {
        throw new Error("El stock del producto es obligatorio");
    }
    if (product.precio === undefined || product.precio === null) {
        throw new Error("El precio del producto es obligatorio");
    }
    
    // 2. Validar que el nombre no esté vacío o solo espacios
    if (!product.nombre.trim() || product.nombre.trim().length === 0) {
        throw new Error("El nombre del producto no puede estar vacío o contener solo espacios");
    }
    
    // 3. Validar que el nombre no exceda 100 caracteres
    if (product.nombre.length > MAX_NOMBRE_LENGTH) {
        throw new Error(`El nombre del producto no puede exceder ${MAX_NOMBRE_LENGTH} caracteres`);
    }
    
    // 4. Validar que la descripción no exceda 500 caracteres
    if (product.descripcion.length > MAX_DESCRIPCION_LENGTH) {
        throw new Error(`La descripción del producto no puede exceder ${MAX_DESCRIPCION_LENGTH} caracteres`);
    }
    
    // 5. Validar que el precio tenga máximo 2 decimales
    const precioStr = product.precio.toString();
    if (precioStr.includes('.') && precioStr.split('.')[1].length > 2) {
        throw new Error("El precio del producto no puede tener más de 2 decimales");
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. Validar que el precio sea mayor a cero
    if (product.precio <= 0) {
        throw new Error("El precio del producto debe ser mayor a cero");
    }
    
    // 2. Validar que el precio no exceda el máximo permitido
    if (product.precio > MAX_PRECIO) {
        throw new Error(`El precio del producto no puede exceder ${MAX_PRECIO}`);
    }
    
    // 3. Validar que el stock no sea negativo
    if (product.stock < 0) {
        throw new Error("El stock del producto no puede ser negativo");
    }
    
    // 4. Validar que el stock no exceda el máximo permitido
    if (product.stock > MAX_STOCK) {
        throw new Error(`El stock del producto no puede exceder ${MAX_STOCK} unidades`);
    }
    
    // 5. Validar que el stock sea un número entero
    if (!Number.isInteger(product.stock)) {
        throw new Error("El stock del producto debe ser un número entero");
    }
    
    // 6. Validar que no exista un producto con el mismo nombre (case-insensitive)
    const nombreExists = await repo.existsByName(product.nombre);
    if (nombreExists) {
        throw new Error("Ya existe un producto con este nombre");
    }

    return repo.create(product);
};

exports.update = async (id, data) => {
    // ========== VALIDACIONES ==========
    // 1. Validar campos obligatorios
    if (!data.nombre) throw new Error("El nombre del producto es obligatorio");
    if (!data.descripcion) throw new Error("La descripcion del producto es obligatoria");
    if (data.stock === undefined || data.stock === null) {
        throw new Error("El stock del producto es obligatorio");
    }
    if (data.precio === undefined || data.precio === null) {
        throw new Error("El precio del producto es obligatorio");
    }
    
    // 2. Validar que el nombre no esté vacío o solo espacios
    if (!data.nombre.trim() || data.nombre.trim().length === 0) {
        throw new Error("El nombre del producto no puede estar vacío o contener solo espacios");
    }
    
    // 3. Validar que el nombre no exceda 100 caracteres
    if (data.nombre.length > MAX_NOMBRE_LENGTH) {
        throw new Error(`El nombre del producto no puede exceder ${MAX_NOMBRE_LENGTH} caracteres`);
    }
    
    // 4. Validar que la descripción no exceda 500 caracteres
    if (data.descripcion.length > MAX_DESCRIPCION_LENGTH) {
        throw new Error(`La descripción del producto no puede exceder ${MAX_DESCRIPCION_LENGTH} caracteres`);
    }
    
    // 5. Validar que el precio tenga máximo 2 decimales
    const precioStr = data.precio.toString();
    if (precioStr.includes('.') && precioStr.split('.')[1].length > 2) {
        throw new Error("El precio del producto no puede tener más de 2 decimales");
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. Validar que el precio sea mayor a cero
    if (data.precio <= 0) {
        throw new Error("El precio del producto debe ser mayor a cero");
    }
    
    // 2. Validar que el precio no exceda el máximo permitido
    if (data.precio > MAX_PRECIO) {
        throw new Error(`El precio del producto no puede exceder ${MAX_PRECIO}`);
    }
    
    // 3. Validar que el stock no sea negativo
    if (data.stock < 0) {
        throw new Error("El stock del producto no puede ser negativo");
    }
    
    // 4. Validar que el stock no exceda el máximo permitido
    if (data.stock > MAX_STOCK) {
        throw new Error(`El stock del producto no puede exceder ${MAX_STOCK} unidades`);
    }
    
    // 5. Validar que el stock sea un número entero
    if (!Number.isInteger(data.stock)) {
        throw new Error("El stock del producto debe ser un número entero");
    }
    
    // 6. Validar que no exista otro producto con el mismo nombre (excluyendo el actual)
    const nombreExists = await repo.existsByName(data.nombre, id);
    if (nombreExists) {
        throw new Error("Ya existe otro producto con este nombre");
    }
    
    // 7. Regla adicional: No permitir actualizar precio a 0 si hay stock disponible
    const productoActual = await repo.getById(id);
    if (productoActual && productoActual.stock > 0 && data.precio === 0) {
        throw new Error("No se puede establecer el precio en 0 cuando hay stock disponible");
    }

    return repo.update(id, data);
};

exports.delete = async (id) => {
    // ========== REGLA DE NEGOCIO ==========
    // No permitir eliminar productos que estén en órdenes
    const isInOrders = await OrderClient.isProductInOrders(id);
    if (isInOrders) {
        throw new Error("No se puede eliminar el producto porque está asociado a órdenes");
    }
    
    return repo.delete(id);
};
