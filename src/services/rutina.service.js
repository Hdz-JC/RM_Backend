const prisma = require("../config/prisma");

async function crearRutina(data) {
    return await prisma.rutinas.create({
        data: {
            entrenador_id: data.entrenador_id,
            usuario_id: data.usuario_id,
            nombre: data.nombre,
            fecha: data.fecha
                ? new Date(`${data.fecha}T00:00:00`)
                : undefined,
            comentarios: data.comentarios
        }
    });
}

async function obtenerRutinas() {
    return await prisma.rutinas.findMany({
        orderBy: {
            fecha_creacion: "desc"
        }
    });
}

async function obtenerRutinaPorId(id) {

    const rutina = await prisma.rutinas.findUnique({
        where: {
            id_rutina: id
        },

        include: {
            usuarios_rutinas_entrenador_idTousuarios: true,

            usuarios_rutinas_usuario_idTousuarios: true,

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
            nombre: rutina.usuarios_rutinas_entrenador_idTousuarios.nombre,
            paterno: rutina.usuarios_rutinas_entrenador_idTousuarios.paterno,
            materno: rutina.usuarios_rutinas_entrenador_idTousuarios.materno
        },

        usuario: {
            id: rutina.usuario_id,
            nombre: rutina.usuarios_rutinas_usuario_idTousuarios.nombre,
            paterno: rutina.usuarios_rutinas_usuario_idTousuarios.paterno,
            materno: rutina.usuarios_rutinas_usuario_idTousuarios.materno
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

async function agregarEjercicioRutina(rutinaId, data) {
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

async function actualizarRutina(id, data) {
    return await prisma.rutinas.update({
        where: {
            id_rutina: id
        },
        data: {
            nombre: data.nombre,
            fecha: data.fecha ? new Date(data.fecha) : undefined,
            comentarios: data.comentarios
        }
    });
}

async function eliminarRutina(id) {
    return await prisma.rutinas.delete({
        where: {
            id_rutina: id
        }
    });
}

module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    agregarEjercicioRutina,
    actualizarRutina,
    eliminarRutina
};