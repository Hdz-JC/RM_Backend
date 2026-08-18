const prisma = require("../config/prisma");

async function obtenerEjercicios() {
    return await prisma.ejercicios.findMany();
}

async function obtenerEjercicioPorId(id) {
    return await prisma.ejercicios.findUnique({
        where: {
            id_ejercicio: id
        }
    });
}

async function crearEjercicio(data) {
    return await prisma.ejercicios.create({
        data: {
            nombre: data.nombre,
            categoria: data.categoria,
            descripcion: data.descripcion,
            created_by: data.created_by
        }
    });
}

async function actualizarEjercicio(id, data) {
    return await prisma.ejercicios.update({
        where: {
            id_ejercicio: id
        },
        data: {
            nombre: data.nombre,
            categoria: data.categoria,
            descripcion: data.descripcion
        }
    });
}

async function eliminarEjercicio(id) {
    return await prisma.ejercicios.delete({
        where: {
            id_ejercicio: id
        }
    });
}

module.exports = {
    obtenerEjercicios,
    obtenerEjercicioPorId,
    crearEjercicio,
    actualizarEjercicio,
    eliminarEjercicio
};