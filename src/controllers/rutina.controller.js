const rutinaService = require("../services/rutina.service");


async function crearRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutina = await rutinaService.crearRutina(
            req.body,
            entrenadorId
        );

        if (!rutina) {
            return res.status(404).json({
                mensaje: "El cliente no existe o no te pertenece"
            });
        }

        res.status(201).json(rutina);

    } catch (error) {
        next(error);
    }
}


async function obtenerRutinas(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutinas = await rutinaService.obtenerRutinas(
            entrenadorId
        );

        res.json(rutinas);

    } catch (error) {
        next(error);
    }
}


async function obtenerRutinaPorId(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutina = await rutinaService.obtenerRutinaPorId(
            req.params.id,
            entrenadorId
        );

        if (!rutina) {
            return res.status(404).json({
                mensaje: "La rutina no existe"
            });
        }

        res.json(rutina);

    } catch (error) {
        next(error);
    }
}


async function agregarEjercicioRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutinaEjercicio =
            await rutinaService.agregarEjercicioRutina(
                req.params.id,
                req.body,
                entrenadorId
            );

        if (!rutinaEjercicio) {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe, no te pertenece o el ejercicio no está disponible"
            });
        }

        res.status(201).json(rutinaEjercicio);

    } catch (error) {
        next(error);
    }
}


async function actualizarEjercicioRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutinaEjercicio =
            await rutinaService.actualizarEjercicioRutina(
                req.params.id,
                req.params.idRutinaEjercicio,
                req.body,
                entrenadorId
            );

        if (!rutinaEjercicio) {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe dentro de esta rutina o no tienes permiso"
            });
        }

        res.json(rutinaEjercicio);

    } catch (error) {
        next(error);
    }
}


async function eliminarEjercicioRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutinaEjercicio =
            await rutinaService.eliminarEjercicioRutina(
                req.params.id,
                req.params.idRutinaEjercicio,
                entrenadorId
            );

        if (!rutinaEjercicio) {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe dentro de esta rutina o no tienes permiso"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
}


async function actualizarRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutina =
            await rutinaService.actualizarRutina(
                req.params.id,
                req.body,
                entrenadorId
            );

        if (!rutina) {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe o no tienes permiso para modificarla"
            });
        }

        res.json(rutina);

    } catch (error) {
        next(error);
    }
}


async function eliminarRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const rutina =
            await rutinaService.eliminarRutina(
                req.params.id,
                entrenadorId
            );

        if (!rutina) {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe o no tienes permiso para eliminarla"
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
}


module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    agregarEjercicioRutina,
    actualizarEjercicioRutina,
    eliminarEjercicioRutina,
    actualizarRutina,
    eliminarRutina
};