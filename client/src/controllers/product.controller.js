// src/controllers/product.controller.js
const service = require('../services/product.service');

exports.getProducts = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.getProductById = async (req, res) => {
    const prod = await service.getById(req.params.id);
    prod ? res.json(prod) : res.status(404).json({ error: "Producto no encontrado" });
};

exports.createProduct = async (req, res) => {
    try {
        const newProd = await service.create(req.body);
        res.status(201).json(newProd);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const result = await service.delete(req.params.id);
    res.json(result);
};
