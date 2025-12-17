const repo = require("../repositories/user.repository");
const OrderClient = require("../clients/order.client");

exports.getAll = () => repo.getAll();

exports.getById = (id) => repo.getById(id);

// Función auxiliar para validar formato de correo
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Función auxiliar para validar formato de cédula (solo números)
const validateCedula = (cedula) => {
    const cedulaRegex = /^\d+$/;
    return cedulaRegex.test(cedula);
};

exports.create = async (user) => {
    // ========== VALIDACIONES ==========
    // 1. Validar campos obligatorios
    if (!user.cedula) throw new Error("La cédula es obligatoria");
    if (!user.nombre) throw new Error("El nombre es obligatorio");
    if (!user.correo) throw new Error("El correo es obligatorio");
    if (!user.telefono) throw new Error("El teléfono es obligatorio");
    
    // 2. Validar formato de cédula (solo números, entre 10 y 13 dígitos)
    if (!validateCedula(user.cedula)) {
        throw new Error("La cédula debe contener solo números");
    }
    if (user.cedula.length < 10 || user.cedula.length > 13) {
        throw new Error("La cédula debe tener entre 10 y 13 dígitos");
    }
    
    // 3. Validar formato de correo electrónico
    if (!validateEmail(user.correo)) {
        throw new Error("El formato del correo electrónico no es válido");
    }
    
    // 4. Validar que el nombre no esté vacío o solo espacios
    if (!user.nombre.trim() || user.nombre.trim().length === 0) {
        throw new Error("El nombre no puede estar vacío o contener solo espacios");
    }
    
    // 5. Validar longitud del teléfono
    if (user.telefono.length !== 10) {
        throw new Error("El teléfono debe tener exactamente 10 dígitos");
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. Validar que el nombre tenga al menos 2 caracteres
    if (user.nombre.trim().length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres");
    }
    
    // 2. Validar que el nombre no exceda 100 caracteres
    if (user.nombre.length > 100) {
        throw new Error("El nombre no puede exceder 100 caracteres");
    }
    
    // 3. Validar que la cédula no esté duplicada
    const cedulaExists = await repo.existsByCedula(user.cedula);
    if (cedulaExists) {
        throw new Error("Ya existe un usuario con esta cédula");
    }
    
    // 4. Validar que el correo no esté duplicado
    const correoExists = await repo.existsByCorreo(user.correo);
    if (correoExists) {
        throw new Error("Ya existe un usuario con este correo electrónico");
    }
    
    // 5. Validar que el teléfono contenga solo números
    if (!/^\d+$/.test(user.telefono)) {
        throw new Error("El teléfono debe contener solo números");
    }

    return repo.create(user);
};

exports.update = async (id, data) => {
    // ========== VALIDACIONES ==========
    // 1. Validar campos obligatorios
    if (!data.cedula) throw new Error("La cédula es obligatoria");
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    if (!data.correo) throw new Error("El correo es obligatorio");
    if (!data.telefono) throw new Error("El teléfono es obligatorio");
    
    // 2. Validar formato de cédula (solo números, entre 10 y 13 dígitos)
    if (!validateCedula(data.cedula)) {
        throw new Error("La cédula debe contener solo números");
    }
    if (data.cedula.length < 10 || data.cedula.length > 13) {
        throw new Error("La cédula debe tener entre 10 y 13 dígitos");
    }
    
    // 3. Validar formato de correo electrónico
    if (!validateEmail(data.correo)) {
        throw new Error("El formato del correo electrónico no es válido");
    }
    
    // 4. Validar que el nombre no esté vacío o solo espacios
    if (!data.nombre.trim() || data.nombre.trim().length === 0) {
        throw new Error("El nombre no puede estar vacío o contener solo espacios");
    }
    
    // 5. Validar longitud del teléfono
    if (data.telefono.length !== 10) {
        throw new Error("El teléfono debe tener exactamente 10 dígitos");
    }
    
    // ========== REGLAS DE NEGOCIO ==========
    // 1. Validar que el nombre tenga al menos 2 caracteres
    if (data.nombre.trim().length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres");
    }
    
    // 2. Validar que el nombre no exceda 100 caracteres
    if (data.nombre.length > 100) {
        throw new Error("El nombre no puede exceder 100 caracteres");
    }
    
    // 3. Validar que la cédula no esté duplicada (excluyendo el usuario actual)
    const cedulaExists = await repo.existsByCedula(data.cedula, id);
    if (cedulaExists) {
        throw new Error("Ya existe otro usuario con esta cédula");
    }
    
    // 4. Validar que el correo no esté duplicado (excluyendo el usuario actual)
    const correoExists = await repo.existsByCorreo(data.correo, id);
    if (correoExists) {
        throw new Error("Ya existe otro usuario con este correo electrónico");
    }
    
    // 5. Validar que el teléfono contenga solo números
    if (!/^\d+$/.test(data.telefono)) {
        throw new Error("El teléfono debe contener solo números");
    }

    return repo.update(id, data);
};

exports.delete = async (id) => {
    // ========== REGLA DE NEGOCIO ==========
    // No permitir eliminar usuarios que tengan órdenes asociadas
    const hasOrders = await OrderClient.hasOrders(id);
    if (hasOrders) {
        throw new Error("No se puede eliminar el usuario porque tiene órdenes asociadas");
    }
    
    return repo.delete(id);
};
