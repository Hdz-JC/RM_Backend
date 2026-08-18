const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const autenticar = require("../middlewares/auth.middleware");

const {
    crearRutinaSchema,
    actualizarRutinaSchema,
    idRutinaSchema,
    agregarEjercicioRutinaSchema,
    idRutinaEjercicioSchema,
    actualizarEjercicioRutinaSchema
} = require("../schemas/rutina.schema");


// Todas las rutas requieren autenticación
router.use(autenticar);


// ============================================================
// RUTINAS
// ============================================================


// Crear rutina
router.post(
    "/",
    validate(crearRutinaSchema, "body"),
    rutinaController.crearRutina
);


// Obtener todas las rutinas del entrenador
router.get(
    "/",
    rutinaController.obtenerRutinas
);


// Obtener una rutina
router.get(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.obtenerRutinaPorId
);


// Actualizar rutina
router.put(
    "/:id",
    validate(idRutinaSchema, "params"),
    validate(actualizarRutinaSchema, "body"),
    rutinaController.actualizarRutina
);


// Eliminar rutina
router.delete(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.eliminarRutina
);


// ============================================================
// EJERCICIOS DE UNA RUTINA
// ============================================================


// Agregar ejercicio a una rutina
router.post(
    "/:id/ejercicios",
    validate(idRutinaSchema, "params"),
    validate(agregarEjercicioRutinaSchema, "body"),
    rutinaController.agregarEjercicioRutina
);


// Actualizar ejercicio dentro de una rutina
router.put(
    "/:id/ejercicios/:idRutinaEjercicio",
    validate(idRutinaEjercicioSchema, "params"),
    validate(actualizarEjercicioRutinaSchema, "body"),
    rutinaController.actualizarEjercicioRutina
);


// Eliminar ejercicio de una rutina
router.delete(
    "/:id/ejercicios/:idRutinaEjercicio",
    validate(idRutinaEjercicioSchema, "params"),
    rutinaController.eliminarEjercicioRutina
);


module.exports = router;