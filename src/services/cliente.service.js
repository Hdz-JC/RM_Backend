const prisma = require("../config/prisma");

async function obtenerClientes(entrenadorId) {
    return await prisma.clientes.findMany({
        where: {
            entrenador_id: entrenadorId
        },
        orderBy: {
            nombre: "asc"
        }
    });
}

async function obtenerClientePorId(id, entrenadorId) {
    return await prisma.clientes.findFirst({
        where: {
            id_cliente: id,
            entrenador_id: entrenadorId
        }
    });
}

async function crearCliente(data, entrenadorId) {
    return await prisma.clientes.create({
        data: {
            entrenador_id: entrenadorId,
            nombre: data.nombre,
            paterno: data.paterno,
            materno: data.materno
        }
    });
}

async function actualizarCliente(id, data, entrenadorId) {
    const cliente = await prisma.clientes.findFirst({
        where: {
            id_cliente: id,
            entrenador_id: entrenadorId
        }
    });

    if (!cliente) {
        return null;
    }

    return await prisma.clientes.update({
        where: {
            id_cliente: id
        },
        data: {
            nombre: data.nombre,
            paterno: data.paterno,
            materno: data.materno
        }
    });
}

async function eliminarCliente(id, entrenadorId) {
    const cliente = await prisma.clientes.findFirst({
        where: {
            id_cliente: id,
            entrenador_id: entrenadorId
        }
    });

    if (!cliente) {
        return null;
    }

    return await prisma.clientes.delete({
        where: {
            id_cliente: id
        }
    });
}

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};