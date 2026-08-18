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

module.exports = {
    crearRutina
};