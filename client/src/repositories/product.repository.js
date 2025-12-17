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

// Verificar si existe un producto con el mismo nombre (excluyendo el ID actual)
exports.existsByName = async (nombre, excludeId = null) => {
    let query = "SELECT * FROM productos WHERE LOWER(nombre) = LOWER($1)";
    let params = [nombre];
    
    if (excludeId) {
        query += " AND id != $2";
        params.push(excludeId);
    }
    
    const result = await db.query(query, params);
    return result.rows.length > 0;
};