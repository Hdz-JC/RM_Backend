const ejercicioService = require("../services/ejercicio.service");

async function obtenerEjercicios(req, res) {

    const ejercicios = await ejercicioService.obtenerEjercicios();

    res.json(ejercicios);
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
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener el ejercicio"
        });
    }
}

async function crearEjercicio(req, res) {
    const { nombre, categoria, descripcion } = req.body;

    const ejercicio = await ejercicioService.crearEjercicio({
        nombre,
        categoria,
        descripcion
    });

    res.status(201).json(ejercicio);
}

module.exports = {
    obtenerEjercicios,
    obtenerEjercicioPorId,
    crearEjercicio
};