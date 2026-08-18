const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const autenticar = require("../middlewares/auth.middleware");

const {
    crearRutinaSchema,
    actualizarRutinaSchema,
    idRutinaSchema,
    idRutinaEjercicioSchema,
    agregarEjercicioRutinaSchema,
    actualizarEjercicioRutinaSchema
} = require("../schemas/rutina.schema");


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
    Obtener todas las rutinas del entrenador
*/
router.get(
    "/",
    rutinaController.obtenerRutinas
);


/*
    Obtener una rutina
*/
router.get(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.obtenerRutinaPorId
);


/*
    Agregar ejercicio a rutina
*/
router.post(
    "/:id/ejercicios",
    validate(idRutinaSchema, "params"),
    validate(agregarEjercicioRutinaSchema, "body"),
    rutinaController.agregarEjercicioRutina
);


/*
    Modificar ejercicio dentro de rutina
*/
router.put(
    "/:id/ejercicios/:idRutinaEjercicio",
    validate(idRutinaEjercicioSchema, "params"),
    validate(
        actualizarEjercicioRutinaSchema,
        "body"
    ),
    rutinaController.actualizarEjercicioRutina
);


/*
    Eliminar ejercicio de rutina
*/
router.delete(
    "/:id/ejercicios/:idRutinaEjercicio",
    validate(idRutinaEjercicioSchema, "params"),
    rutinaController.eliminarEjercicioRutina
);


/*
    Modificar rutina
*/
router.put(
    "/:id",
    validate(idRutinaSchema, "params"),
    validate(actualizarRutinaSchema, "body"),
    rutinaController.actualizarRutina
);


/*
    Eliminar rutina
*/
router.delete(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.eliminarRutina
);


module.exports = router;