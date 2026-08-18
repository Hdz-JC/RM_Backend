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

module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId
};