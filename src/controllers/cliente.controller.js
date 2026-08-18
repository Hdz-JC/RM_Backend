const clienteService = require("../services/cliente.service");


async function obtenerClientes(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;

        const clientes = await clienteService.obtenerClientes(
            entrenadorId
        );

        res.json(clientes);

    } catch (error) {
        next(error);
    }
}


async function obtenerClientePorId(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;
        const { id } = req.params;

        const cliente = await clienteService.obtenerClientePorId(
            id,
            entrenadorId
        );

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.json(cliente);

    } catch (error) {
        next(error);
    }
}


async function crearCliente(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;

        const cliente = await clienteService.crearCliente(
            req.body,
            entrenadorId
        );

        res.status(201).json(cliente);

    } catch (error) {
        next(error);
    }
}


async function actualizarCliente(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;
        const { id } = req.params;

        const cliente = await clienteService.actualizarCliente(
            id,
            req.body,
            entrenadorId
        );

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.json(cliente);

    } catch (error) {
        next(error);
    }
}


async function eliminarCliente(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;
        const { id } = req.params;

        const cliente = await clienteService.eliminarCliente(
            id,
            entrenadorId
        );

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
}


module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};