const repo = require("../repositories/user.repository");

exports.getAll = () => repo.getAll();

exports.getById = (id) => repo.getById(id);

exports.create = (user) => {
    // Validaciones previas
    if (!user.cedula) throw new Error("La cédula es obligatoria");
    if (!user.nombre) throw new Error("El nombre es obligatorio");
    if (!user.correo) throw new Error("El correo es obligatorio");
    if (!user.telefono) throw new Error("El teléfono es obligatorio");
    if (user.telefono.length !== 10) {
        throw new Error("El teléfono debe tener 10 dígitos");
    }

    return repo.create(user);
};

exports.update = (id, data) => {
    // Validaciones previas
    if (!data.cedula) throw new Error("La cédula es obligatoria");
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    if (!data.correo) throw new Error("El correo es obligatorio");
    if (!data.telefono) throw new Error("El teléfono es obligatorio");
    if (data.telefono.length !== 10) {
        throw new Error("El teléfono debe tener 10 dígitos");
    }

    return repo.update(id, data);
};

exports.delete = (id) => repo.delete(id);
