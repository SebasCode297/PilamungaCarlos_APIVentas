const db = require("../database/index.db");

exports.getAll = async () => {
    const result = await db.query("SELECT * FROM usuarios");
    return result.rows;
};

exports.getById = async (id) => {
    const result = await db.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
    return result.rows[0];
};

exports.create = async (user) => {
    const result = await db.query(
        "INSERT INTO usuarios (cedula, nombre, correo, telefono) VALUES ($1, $2, $3, $4) RETURNING *",
        [user.cedula, user.nombre, user.correo, user.telefono]
    );
    return result.rows[0]
};

exports.update = async (id, user) => {
    const result = await db.query(
        "UPDATE usuarios SET cedula = $1, nombre = $2, correo = $3, telefono = $4 WHERE id_usuario = $5 RETURNING *",
        [user.cedula, user.nombre, user.correo, user.telefono, id]
    );
    return result.rows[0]
};

exports.delete = async (id) => {
    const result = await db.query(
        "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

// Verificar si existe un usuario con la misma cédula (excluyendo el ID actual)
exports.existsByCedula = async (cedula, excludeId = null) => {
    let query = "SELECT * FROM usuarios WHERE cedula = $1";
    let params = [cedula];
    
    if (excludeId) {
        query += " AND id_usuario != $2";
        params.push(excludeId);
    }
    
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

// Verificar si existe un usuario con el mismo correo (excluyendo el ID actual)
exports.existsByCorreo = async (correo, excludeId = null) => {
    let query = "SELECT * FROM usuarios WHERE correo = $1";
    let params = [correo];
    
    if (excludeId) {
        query += " AND id_usuario != $2";
        params.push(excludeId);
    }
    
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

// {
//   "cedula": "1234567890",
//   "nombre": "Juan Pérez",
//   "correo": "juan.perez@example.com",
//   "telefono": "987654321"
// }
