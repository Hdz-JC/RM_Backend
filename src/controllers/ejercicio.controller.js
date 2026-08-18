const ejercicioService = require("../services/ejercicio.service");

async function obtenerEjercicios(req, res) {

    try {

        const ejercicios = await ejercicioService.obtenerEjercicios();

        res.json(ejercicios);
    } catch (error) {
        next(error);
    }
}

async function obtenerEjercicioPorId(req, res) {
    try {
        const { id } = req.params;

        const ejercicio = await ejercicioService.obtenerEjercicioPorId(id);

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
        const { nombre, categoria, descripcion } = req.body;

        const ejercicio = await ejercicioService.crearEjercicio({
            nombre,
            categoria,
            descripcion,
            created_by: req.usuario.id_usuario
        });

        res.status(201).json(ejercicio);

    } catch (error) {
        next(error);
    }
}

async function actualizarEjercicio(req, res, next) {
    try {
        const { id } = req.params;

        const { nombre, categoria, descripcion } = req.body;

        const ejercicio = await ejercicioService.actualizarEjercicio(id, {
            nombre,
            categoria,
            descripcion
        });

        res.status(200).json(ejercicio);

    } catch (error) {
        next(error);
    }
}

async function eliminarEjercicio(req, res, next) {
    try {
        const { id } = req.params;

        await ejercicioService.eliminarEjercicio(id);

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