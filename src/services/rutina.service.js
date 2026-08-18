const prisma = require("../config/prisma");


/**
 * Crear una rutina.
 *
 * El entrenador_id viene del usuario autenticado,
 * nunca del body.
 */
async function crearRutina(data, entrenadorId) {

    // Verificar que el cliente pertenece al entrenador
    const cliente = await prisma.clientes.findFirst({
        where: {
            id_cliente: data.cliente_id,
            entrenador_id: entrenadorId
        }
    });

    if (!cliente) {
        return null;
    }

    return await prisma.rutinas.create({
        data: {
            entrenador_id: entrenadorId,
            cliente_id: data.cliente_id,
            nombre: data.nombre,

            fecha: data.fecha
                ? new Date(`${data.fecha}T00:00:00`)
                : undefined,

            comentarios: data.comentarios
        }
    });
}


/**
 * Obtener solamente las rutinas
 * del entrenador autenticado.
 */
async function obtenerRutinas(entrenadorId) {

    return await prisma.rutinas.findMany({
        where: {
            entrenador_id: entrenadorId
        },

        orderBy: {
            fecha_creacion: "desc"
        },

        include: {
            clientes: true
        }
    });
}


/**
 * Obtener una rutina solamente si
 * pertenece al entrenador autenticado.
 */
async function obtenerRutinaPorId(id, entrenadorId) {

    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: id,
            entrenador_id: entrenadorId
        },

        include: {
            clientes: true,

            usuarios_rutinas_entrenador_idTousuarios: true,

            rutina_ejercicio: {
                orderBy: {
                    orden: "asc"
                },

                include: {
                    ejercicios: true
                }
            }
        }
    });

    if (!rutina) {
        return null;
    }

    return {
        id: rutina.id_rutina,

        nombre: rutina.nombre,

        fecha: rutina.fecha,

        comentarios: rutina.comentarios,

        entrenador: {
            id: rutina.entrenador_id,

            nombre:
                rutina
                    .usuarios_rutinas_entrenador_idTousuarios
                    .nombre,

            paterno:
                rutina
                    .usuarios_rutinas_entrenador_idTousuarios
                    .paterno,

            materno:
                rutina
                    .usuarios_rutinas_entrenador_idTousuarios
                    .materno
        },

        cliente: {
            id: rutina.clientes.id_cliente,

            nombre: rutina.clientes.nombre,

            paterno: rutina.clientes.paterno,

            materno: rutina.clientes.materno
        },

        ejercicios: rutina.rutina_ejercicio.map(item => ({
            id: item.id_rutina_ejercicio,

            ejercicio_id: item.ejercicio_id,

            nombre: item.ejercicios.nombre,

            categoria: item.ejercicios.categoria,

            descripcion: item.ejercicios.descripcion,

            series: item.series,

            repeticiones: item.repeticiones,

            orden: item.orden,

            comentarios: item.comentarios
        }))
    };
}


/**
 * Agregar ejercicio a una rutina.
 *
 * Se comprueba:
 * 1. Que la rutina pertenece al entrenador.
 * 2. Que el ejercicio es global o pertenece al entrenador.
 */
async function agregarEjercicioRutina(
    rutinaId,
    data,
    entrenadorId
) {

    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: rutinaId,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return null;
    }


    const ejercicio = await prisma.ejercicios.findFirst({
        where: {
            id_ejercicio: data.ejercicio_id,

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

    if (!ejercicio) {
        return null;
    }


    return await prisma.rutina_ejercicio.create({
        data: {
            rutina_id: rutinaId,

            ejercicio_id: data.ejercicio_id,

            series: data.series,

            repeticiones: data.repeticiones,

            orden: data.orden,

            comentarios: data.comentarios
        }
    });
}


/**
 * Actualizar una rutina propia.
 */
async function actualizarRutina(
    id,
    data,
    entrenadorId
) {

    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: id,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return null;
    }


    return await prisma.rutinas.update({
        where: {
            id_rutina: id
        },

        data: {
            nombre: data.nombre,

            fecha: data.fecha
                ? new Date(`${data.fecha}T00:00:00`)
                : undefined,

            comentarios: data.comentarios
        }
    });
}


/**
 * Eliminar una rutina propia.
 */
async function eliminarRutina(
    id,
    entrenadorId
) {

    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: id,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return null;
    }


    return await prisma.rutinas.delete({
        where: {
            id_rutina: id
        }
    });
}

async function actualizarEjercicioRutina(
    rutinaId,
    rutinaEjercicioId,
    data,
    entrenadorId
) {

    // Primero verificamos que la rutina pertenece
    // al entrenador autenticado.
    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: rutinaId,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return null;
    }


    // Verificamos que el ejercicio realmente
    // pertenece a esa rutina.
    const rutinaEjercicio =
        await prisma.rutina_ejercicio.findFirst({
            where: {
                id_rutina_ejercicio: rutinaEjercicioId,
                rutina_id: rutinaId
            }
        });

    if (!rutinaEjercicio) {
        return null;
    }


    return await prisma.rutina_ejercicio.update({
        where: {
            id_rutina_ejercicio: rutinaEjercicioId
        },

        data: {
            series: data.series,
            repeticiones: data.repeticiones,
            orden: data.orden,
            comentarios: data.comentarios
        }
    });
}


async function eliminarEjercicioRutina(
    rutinaId,
    rutinaEjercicioId,
    entrenadorId
) {

    // Verificar que la rutina pertenece
    // al entrenador autenticado.
    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: rutinaId,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return null;
    }


    // Verificar que el ejercicio pertenece
    // a esa rutina.
    const rutinaEjercicio =
        await prisma.rutina_ejercicio.findFirst({
            where: {
                id_rutina_ejercicio: rutinaEjercicioId,
                rutina_id: rutinaId
            }
        });

    if (!rutinaEjercicio) {
        return null;
    }


    return await prisma.rutina_ejercicio.delete({
        where: {
            id_rutina_ejercicio: rutinaEjercicioId
        }
    });
}


module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    agregarEjercicioRutina,
    actualizarRutina,
    eliminarRutina,
    actualizarEjercicioRutina,
    eliminarEjercicioRutina
};