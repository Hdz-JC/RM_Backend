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

module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId
};