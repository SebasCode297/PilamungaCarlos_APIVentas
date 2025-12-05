const db = require("../database/index.db");

exports.getAll = async () => {
    const result = await db.query("SELECT * FROM productos ORDER BY id");
    return result.rows;
};

exports.getById = async (id) => {
    const result = await db.query("SELECT * FROM productos WHERE id = $1", [id]);
    return result.rows[0];
};

exports.create = async (product) => {
    const result = await db.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *",
        [product.nombre, product.descripcion, product.precio, product.stock]
    );
    return result.rows[0];
};

exports.update = async (id, product) => {
    const result = await db.query(
        "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *",
        [product.nombre, product.descripcion, product.precio, product.stock, id]
    );
    return result.rows[0];
};

exports.delete = async (id) => {
    const result = await db.query(
        "DELETE FROM productos WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};
