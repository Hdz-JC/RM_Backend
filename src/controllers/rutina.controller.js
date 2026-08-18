const rutinaService = require("../services/rutina.service");

async function crearRutina(req, res, next) {
    try {
        const rutina = await rutinaService.crearRutina(req.body);

        res.status(201).json(rutina);

    } catch (error) {
        next(error);
    }
}

async function obtenerRutinas(req, res, next) {
    try {
        const rutinas = await rutinaService.obtenerRutinas();

        res.json(rutinas);

    } catch (error) {
        next(error);
    }
}

async function obtenerRutinaPorId(req, res, next) {
    try {
        const rutina = await rutinaService.obtenerRutinaPorId(
            req.params.id
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
        const rutinaEjercicio =
            await rutinaService.agregarEjercicioRutina(
                req.params.id,
                req.body
            );

        res.status(201).json(rutinaEjercicio);

    } catch (error) {
        next(error);
    }
}

async function actualizarRutina(req, res) {
    try {

        const rutina = await rutinaService.actualizarRutina(
            req.params.id,
            req.body
        );

        res.json(rutina);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar la rutina"
        });
    }
}

async function eliminarRutina(req, res, next) {
    try {
        const { id } = req.params;

        await rutinaService.eliminarRutina(id);

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
    actualizarRutina,
    eliminarRutina
};