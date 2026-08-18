const prisma = require("../config/prisma");

/**
 * Obtener ejercicios disponibles para el entrenador autenticado.
 *
 * Se muestran:
 *  - ejercicios globales (created_by = null)
 *  - ejercicios creados por el entrenador actual
 *
 * NO se muestran ejercicios privados de otros entrenadores.
 */
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


/**
 * Obtener un ejercicio solamente si:
 *  - es global
 *  - o pertenece al entrenador actual
 */
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


/**
 * Crear ejercicio propio del entrenador.
 *
 * created_by se obtiene del usuario autenticado,
 * NO del body enviado por el frontend.
 */
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


/**
 * Actualizar un ejercicio.
 *
 * Los ejercicios globales no pueden ser modificados
 * por un entrenador.
 *
 * Solamente puede modificar sus propios ejercicios.
 */
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


/**
 * Eliminar un ejercicio.
 *
 * Solamente se pueden eliminar ejercicios creados
 * por el entrenador actual.
 *
 * Los ejercicios globales no se pueden eliminar aquí.
 */
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