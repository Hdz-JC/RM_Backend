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

async function obtenerLogoRutina(req, res, next) {
    try {
        const entrenadorId = req.usuario.id_usuario;

        const logo = await rutinaService.obtenerLogoRutina(
            req.params.id,
            entrenadorId
        );

        if (!logo) {
            return res.status(404).json({
                mensaje: "La rutina no existe o no tienes permiso"
            });
        }

        res.set("Content-Type", logo.contentType);
        res.send(logo.buffer);

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

        const resultado =
            await rutinaService.agregarEjercicioRutina(
                req.params.id,
                req.body,
                entrenadorId
            );

        if (resultado.tipo === "RUTINA_NO_DISPONIBLE") {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe o no te pertenece"
            });
        }

        if (resultado.tipo === "EJERCICIO_NO_DISPONIBLE") {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe o no está disponible para ti"
            });
        }

        if (resultado.tipo === "ORDEN_DUPLICADO") {
            return res.status(409).json({
                mensaje:
                    "Ya existe un ejercicio con ese día y orden dentro de la rutina"
            });
        }

        res.status(201).json(resultado);

    } catch (error) {
        next(error);
    }
}


/*
    AGREGAR VARIOS EJERCICIOS A UNA RUTINA
*/
async function agregarEjerciciosLoteRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const resultado =
            await rutinaService.agregarEjerciciosLoteRutina(
                req.params.id,
                req.body.ejercicios,
                entrenadorId
            );

        if (resultado?.tipo === "RUTINA_NO_DISPONIBLE") {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe o no te pertenece"
            });
        }

        if (resultado?.tipo === "EJERCICIO_NO_DISPONIBLE") {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe o no está disponible para ti",
                ejercicio_id: resultado.ejercicio_id
            });
        }

        if (resultado?.tipo === "ORDEN_DUPLICADO") {
            return res.status(409).json({
                mensaje:
                    "Ya existe un ejercicio con ese día y orden dentro de la rutina",
                dia: resultado.dia,
                orden: resultado.orden
            });
        }

        return res.status(201).json(resultado);

    } catch (error) {
        next(error);
    }
}


async function actualizarEjercicioRutina(req, res, next) {

    try {

        const entrenadorId = req.usuario.id_usuario;

        const resultado =
            await rutinaService.actualizarEjercicioRutina(
                req.params.id,
                req.params.idRutinaEjercicio,
                req.body,
                entrenadorId
            );

        // La rutina no existe o no pertenece al entrenador
        if (resultado?.tipo === "RUTINA_NO_DISPONIBLE") {
            return res.status(404).json({
                mensaje:
                    "La rutina no existe o no te pertenece"
            });
        }

        // El ejercicio no existe dentro de esta rutina
        if (
            resultado?.tipo ===
            "EJERCICIO_RUTINA_NO_DISPONIBLE"
        ) {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe dentro de esta rutina"
            });
        }

        // El nuevo ejercicio no está disponible
        if (
            resultado?.tipo ===
            "EJERCICIO_NO_DISPONIBLE"
        ) {
            return res.status(404).json({
                mensaje:
                    "El ejercicio no existe o no está disponible para ti"
            });
        }

        // Ya existe otro ejercicio con ese día + orden
        if (
            resultado?.tipo ===
            "ORDEN_DUPLICADO"
        ) {
            return res.status(409).json({
                mensaje:
                    "Ya existe otro ejercicio con ese día y orden dentro de la rutina"
            });
        }

        // Actualización exitosa
        return res.json(resultado);

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
    agregarEjerciciosLoteRutina,
    actualizarEjercicioRutina,
    eliminarEjercicioRutina,
    actualizarRutina,
    eliminarRutina,
    obtenerLogoRutina
};

