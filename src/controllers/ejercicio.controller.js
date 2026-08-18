const ejercicioService = require("../services/ejercicio.service");

async function obtenerEjercicios(req, res) {

    const ejercicios = await ejercicioService.obtenerEjercicios();

    res.json(ejercicios);
}

module.exports = {
    obtenerEjercicios
};