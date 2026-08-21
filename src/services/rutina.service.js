const prisma = require("../config/prisma");


async function crearRutina(data, entrenadorId) {

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
                include: {
                    ejercicios: true
                }
            }
        }
    });

    if (!rutina) {
        return null;
    }

    // Orden correcto de los días de la semana
    const ordenDias = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
    ];

    // Agrupar ejercicios por día
    const diasMap = new Map();

    for (const item of rutina.rutina_ejercicio) {

        if (!diasMap.has(item.dia)) {
            diasMap.set(item.dia, []);
        }

        diasMap.get(item.dia).push({
            id: item.id_rutina_ejercicio,

            ejercicio_id: item.ejercicio_id,

            nombre: item.ejercicios.nombre,

            categoria: item.ejercicios.categoria,

            descripcion: item.ejercicios.descripcion,

            series: item.series,

            repeticiones: item.repeticiones,

            orden: item.orden,

            comentarios: item.comentarios
        });
    }

    // Ordenar ejercicios dentro de cada día
    for (const ejercicios of diasMap.values()) {
        ejercicios.sort((a, b) => a.orden - b.orden);
    }

    // Convertir el Map a arreglo y ordenar los días
    const dias = Array.from(diasMap.entries())
        .sort(([diaA], [diaB]) => {
            return ordenDias.indexOf(diaA) - ordenDias.indexOf(diaB);
        })
        .map(([dia, ejercicios]) => ({
            dia,
            ejercicios
        }));

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
            id: rutina.cliente_id,

            nombre: rutina.clientes.nombre,

            paterno: rutina.clientes.paterno,

            materno: rutina.clientes.materno
        },

        dias
    };
}


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
        return {
            tipo: "RUTINA_NO_DISPONIBLE"
        };
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
        return {
            tipo: "EJERCICIO_NO_DISPONIBLE"
        };
    }

    const ejercicioMismoOrden =
        await prisma.rutina_ejercicio.findFirst({
            where: {
                rutina_id: rutinaId,
                dia: data.dia,
                orden: data.orden
            }
        });

    if (ejercicioMismoOrden) {
        return {
            tipo: "ORDEN_DUPLICADO"
        };
    }

    return await prisma.rutina_ejercicio.create({
        data: {
            rutina_id: rutinaId,
            ejercicio_id: data.ejercicio_id,
            dia: data.dia,
            series: data.series,
            repeticiones: data.repeticiones,
            orden: data.orden,
            comentarios: data.comentarios
        },
        include: {
            ejercicios: true
        }
    });
}

async function agregarEjerciciosLoteRutina(
    rutinaId,
    ejercicios,
    entrenadorId
) {

    // 1. Verificar que la rutina exista y pertenezca al entrenador
    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: rutinaId,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return {
            tipo: "RUTINA_NO_DISPONIBLE"
        };
    }

    // 2. Validar todos los ejercicios antes de insertar
    for (const ejercicio of ejercicios) {

        const disponible = await prisma.ejercicios.findFirst({
            where: {
                id_ejercicio: ejercicio.ejercicio_id,

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

        if (!disponible) {
            return {
                tipo: "EJERCICIO_NO_DISPONIBLE",
                ejercicio_id: ejercicio.ejercicio_id
            };
        }
    }

    // 3. Validar que no haya órdenes duplicados
    //    dentro del mismo día
    const combinaciones = new Set();

    for (const ejercicio of ejercicios) {

        const clave =
            `${ejercicio.dia}-${ejercicio.orden}`;

        if (combinaciones.has(clave)) {
            return {
                tipo: "ORDEN_DUPLICADO",
                dia: ejercicio.dia,
                orden: ejercicio.orden
            };
        }

        combinaciones.add(clave);
    }

    // 4. Validar que no choquen con ejercicios
    //    que ya existen en la rutina
    for (const ejercicio of ejercicios) {

        const existente =
            await prisma.rutina_ejercicio.findFirst({
                where: {
                    rutina_id: rutinaId,
                    dia: ejercicio.dia,
                    orden: ejercicio.orden
                }
            });

        if (existente) {
            return {
                tipo: "ORDEN_DUPLICADO",
                dia: ejercicio.dia,
                orden: ejercicio.orden
            };
        }
    }

    // 5. Insertar todos los ejercicios en una transaccion
    const resultado = await prisma.$transaction(
        ejercicios.map((ejercicio) =>
            prisma.rutina_ejercicio.create({
                data: {
                    rutina_id: rutinaId,
                    ejercicio_id: ejercicio.ejercicio_id,
                    dia: ejercicio.dia,
                    series: ejercicio.series,
                    repeticiones: ejercicio.repeticiones,
                    orden: ejercicio.orden,
                    comentarios: ejercicio.comentarios
                },

                include: {
                    ejercicios: true
                }
            })
        )
    );

    return resultado;
}

/*
    MODIFICAR UN EJERCICIO DENTRO DE UNA RUTINA
*/
async function actualizarEjercicioRutina(
    rutinaId,
    rutinaEjercicioId,
    data,
    entrenadorId
) {

    // 1. Verificar que la rutina exista y pertenezca al entrenador
    const rutina = await prisma.rutinas.findFirst({
        where: {
            id_rutina: rutinaId,
            entrenador_id: entrenadorId
        }
    });

    if (!rutina) {
        return {
            tipo: "RUTINA_NO_DISPONIBLE"
        };
    }

    // 2. Verificar que el ejercicio dentro de la rutina exista
    const rutinaEjercicio =
        await prisma.rutina_ejercicio.findFirst({
            where: {
                id_rutina_ejercicio: rutinaEjercicioId,
                rutina_id: rutinaId
            }
        });

    if (!rutinaEjercicio) {
        return {
            tipo: "EJERCICIO_RUTINA_NO_DISPONIBLE"
        };
    }

    // 3. Verificar que el NUEVO ejercicio esté disponible
    //    para este entrenador
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
        return {
            tipo: "EJERCICIO_NO_DISPONIBLE"
        };
    }

    // 4. Verificar que el nuevo día + orden
    //    no esté ocupado por OTRO ejercicio
    const ejercicioMismoOrden =
        await prisma.rutina_ejercicio.findFirst({
            where: {
                rutina_id: rutinaId,
                dia: data.dia,
                orden: data.orden,

                NOT: {
                    id_rutina_ejercicio: rutinaEjercicioId
                }
            }
        });

    if (ejercicioMismoOrden) {
        return {
            tipo: "ORDEN_DUPLICADO"
        };
    }

    // 5. Actualizar el ejercicio
    return await prisma.rutina_ejercicio.update({
        where: {
            id_rutina_ejercicio: rutinaEjercicioId
        },

        data: {
            ejercicio_id: data.ejercicio_id,
            dia: data.dia,
            series: data.series,
            repeticiones: data.repeticiones,
            orden: data.orden,
            comentarios: data.comentarios
        },

        include: {
            ejercicios: true
        }
    });
}

/*
    ELIMINAR UN EJERCICIO DE UNA RUTINA

    IMPORTANTE:
    Esto NO elimina el ejercicio del catálogo.
    Solamente elimina la relación con esta rutina.
*/
async function eliminarEjercicioRutina(
    rutinaId,
    rutinaEjercicioId,
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


async function eliminarRutina(id, entrenadorId) {

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


module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    agregarEjercicioRutina,
    agregarEjerciciosLoteRutina,
    actualizarEjercicioRutina,
    eliminarEjercicioRutina,
    actualizarRutina,
    eliminarRutina
};