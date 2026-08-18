const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const {
    crearRutinaSchema,
    idRutinaSchema
} = require("../schemas/rutina.schema");


router.post(
    "/",
    validate(crearRutinaSchema, "body"),
    rutinaController.crearRutina
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


module.exports = router;