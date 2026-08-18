const prisma = require("../config/prisma");


async function obtenerEjercicios(entrenadorId) {
    return await prisma.ejercicios.findMany({
        where: {
            OR: [
                {
                    created_by: null
                },
                {
                    created_by: entrenadorId
                }
            ]
        },
        orderBy: {
            nombre: "asc"
        }
    });
}


async function obtenerEjercicioPorId(id, entrenadorId) {
    return await prisma.ejercicios.findFirst({
        where: {
            id_ejercicio: id,
            OR: [
                {
                    created_by: null
                },
                {
                    created_by: entrenadorId
                }
            ]
        }
    });
}


async function crearEjercicio(data, entrenadorId) {
    return await prisma.ejercicios.create({
        data: {
            nombre: data.nombre,
            categoria: data.categoria,
            descripcion: data.descripcion,
            created_by: entrenadorId
        }
    });
}


async function actualizarEjercicio(id, data, entrenadorId) {
    const ejercicio = await prisma.ejercicios.findFirst({
        where: {
            id_ejercicio: id,
            created_by: entrenadorId
        }
    });

    if (!ejercicio) {
        return null;
    }

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


async function eliminarEjercicio(id, entrenadorId) {
    const ejercicio = await prisma.ejercicios.findFirst({
        where: {
            id_ejercicio: id,
            created_by: entrenadorId
        }
    });

    if (!ejercicio) {
        return null;
    }

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