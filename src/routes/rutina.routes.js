const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const {
    crearRutinaSchema,
    idRutinaSchema,
    agregarEjercicioRutinaSchema
} = require("../schemas/rutina.schema");


router.post(
    "/",
    validate(crearRutinaSchema, "body"),
    rutinaController.crearRutina
);

router.post(
    "/:id/ejercicios",
    validate(idRutinaSchema, "params"),
    validate(agregarEjercicioRutinaSchema, "body"),
    rutinaController.agregarEjercicioRutina
);

router.get(
    "/",
    rutinaController.obtenerRutinas
);

router.get(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.obtenerRutinaPorId
);

router.put("/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.actualizarRutina
);

router.delete(
    "/:id",
    validate(idRutinaSchema, "params"),
    rutinaController.eliminarRutina
);


module.exports = router;