const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const autenticar = require("../middlewares/auth.middleware");

const {
    crearRutinaSchema,
    actualizarRutinaSchema,
    idRutinaSchema,
    agregarEjercicioRutinaSchema
} = require("../schemas/rutina.schema");


/*
    Todas las rutas de rutinas requieren autenticación.
*/
router.use(autenticar);


/*
    Crear rutina
*/
router.post(
    "/",
    validate(crearRutinaSchema, "body"),
    rutinaController.crearRutina
);


/*
    Obtener todas las rutinas del entrenador autenticado.
*/
router.get(
    "/",
    rutinaController.obtenerRutinas
);


/*
    Obtener una rutina.
*/
router.get(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.obtenerRutinaPorId
);


/*
    Agregar ejercicio a una rutina.
*/
router.post(
    "/:id/ejercicios",
    validate(idRutinaSchema, "params"),
    validate(agregarEjercicioRutinaSchema, "body"),
    rutinaController.agregarEjercicioRutina
);


/*
    Actualizar rutina.
*/
router.put(
    "/:id",
    validate(idRutinaSchema, "params"),
    validate(actualizarRutinaSchema, "body"),
    rutinaController.actualizarRutina
);


/*
    Eliminar rutina.
*/
router.delete(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.eliminarRutina
);


module.exports = router;