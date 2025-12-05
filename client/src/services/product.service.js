// src/services/product.service.js
const repo = require('../repositories/product.repository');

exports.getAll = () => repo.getAll();

exports.getById = (id) => repo.getById(id);

exports.create = (product) => {
    if (!product.nombre) throw new Error("El nombre del producto es obligatorio");
    if (!product.descripcion) throw new Error("La descripcion del producto es obligatoria");

    if (product.stock === undefined || product.stock === null) {
        throw new Error("El stock del producto es obligatorio");
    }

    if (product.precio === undefined || product.precio === null) {
        throw new Error("El precio del producto es obligatorio");
    }

    if (product.precio <= 0) {
        throw new Error("El precio del producto debe ser mayor a cero");
    }

    if (product.stock < 0) {
        throw new Error("El stock del producto no puede ser negativo");
    }

    return repo.create(product);
};

exports.update = (id, data) => {
    // Aquí CORRIGO: antes usabas product.stock, ahora uso data.stock
    if (data.stock < 0) throw new Error("El stock del producto no puede ser negativo");
    if (data.precio <= 0) throw new Error("El precio del producto debe ser mayor a cero");

    if (!data.nombre) throw new Error("El nombre del producto es obligatorio");
    if (!data.descripcion) throw new Error("La descripcion del producto es obligatoria");

    if (data.stock === undefined || data.stock === null) {
        throw new Error("El stock del producto es obligatorio");
    }

    if (data.precio === undefined || data.precio === null) {
        throw new Error("El precio del producto es obligatorio");
    }

    return repo.update(id, data);
};

exports.delete = (id) => repo.delete(id);
