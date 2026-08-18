const express = require("express");

const router = express.Router();

const ejercicioController = require("../controllers/ejercicio.controller");

const validate = require("../middlewares/validate.middleware");

const autenticar = require("../middlewares/auth.middleware");

const {
    crearEjercicioSchema,
    actualizarEjercicioSchema,
    idEjercicioSchema
} = require("../schemas/ejercicio.schema");


// Todas las rutas de ejercicios requieren autenticación
router.use(autenticar);


// Obtener ejercicios disponibles
router.get(
    "/",
    ejercicioController.obtenerEjercicios
);


// Obtener ejercicio por ID
router.get(
    "/:id",
    validate(idEjercicioSchema, "params"),
    ejercicioController.obtenerEjercicioPorId
);


// Crear ejercicio propio
router.post(
    "/",
    validate(crearEjercicioSchema, "body"),
    ejercicioController.crearEjercicio
);


// Actualizar ejercicio propio
router.put(
    "/:id",
    validate(idEjercicioSchema, "params"),
    validate(actualizarEjercicioSchema, "body"),
    ejercicioController.actualizarEjercicio
);


// Eliminar ejercicio propio
router.delete(
    "/:id",
    validate(idEjercicioSchema, "params"),
    ejercicioController.eliminarEjercicio
);


module.exports = router;