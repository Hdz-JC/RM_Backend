const ejercicioService = require("../services/ejercicio.service");


async function obtenerEjercicios(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;

        const ejercicios = await ejercicioService.obtenerEjercicios(
            entrenadorId
        );

        res.json(ejercicios);

    } catch (error) {
        next(error);
    }
}


async function obtenerEjercicioPorId(req, res, next) {
    try {
        const { id } = req.params;

        const entrenadorId = req.usuario.id_usuario;

        const ejercicio = await ejercicioService.obtenerEjercicioPorId(
            id,
            entrenadorId
        );

        if (!ejercicio) {
            return res.status(404).json({
                mensaje: "Ejercicio no encontrado"
            });
        }

        res.json(ejercicio);

    } catch (error) {
        next(error);
    }
}


async function crearEjercicio(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;

        const ejercicio = await ejercicioService.crearEjercicio(
            req.body,
            entrenadorId
        );

        res.status(201).json(ejercicio);

    } catch (error) {
        next(error);
    }
}


async function actualizarEjercicio(req, res, next) {
    try {
        const { id } = req.params;

        const entrenadorId = req.usuario.id_usuario;

        const ejercicio = await ejercicioService.actualizarEjercicio(
            id,
            req.body,
            entrenadorId
        );

        if (!ejercicio) {
            return res.status(404).json({
                mensaje: "Ejercicio no encontrado o no tienes permiso para modificarlo"
            });
        }

        res.json(ejercicio);

    } catch (error) {
        next(error);
    }
}


async function eliminarEjercicio(req, res, next) {
    try {
        const { id } = req.params;

        const entrenadorId = req.usuario.id_usuario;

        const ejercicio = await ejercicioService.eliminarEjercicio(
            id,
            entrenadorId
        );

        if (!ejercicio) {
            return res.status(404).json({
                mensaje: "Ejercicio no encontrado o no tienes permiso para eliminarlo"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
}


module.exports = {
    obtenerEjercicios,
    obtenerEjercicioPorId,
    crearEjercicio,
    actualizarEjercicio,
    eliminarEjercicio
};