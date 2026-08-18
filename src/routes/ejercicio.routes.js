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

router.get("/",
    ejercicioController.obtenerEjercicios
);

router.get("/:id",
    validate(idEjercicioSchema, "params"),
    ejercicioController.obtenerEjercicioPorId
);

router.post("/",
    autenticar,
    validate(crearEjercicioSchema, "body"),
    ejercicioController.crearEjercicio
);

router.put("/:id",
    validate(idEjercicioSchema, "params"),
    validate(actualizarEjercicioSchema, "body"),
    ejercicioController.actualizarEjercicio
);

router.delete("/:id",
    validate(idEjercicioSchema, "params"),
    ejercicioController.eliminarEjercicio
);

module.exports = router;