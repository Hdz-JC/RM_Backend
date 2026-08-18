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
    return await prisma.rutinas.findUnique({
        where: {
            id_rutina: id
        },
        include: {
            usuarios_rutinas_entrenador_idTousuarios: true,
            usuarios_rutinas_usuario_idTousuarios: true
        }
    });
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

module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    agregarEjercicioRutina
};