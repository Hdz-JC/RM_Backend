const express = require("express");

const router = express.Router();

const ejercicioController = require("../controllers/ejercicio.controller");

router.get("/", ejercicioController.obtenerEjercicios);
router.get("/:id", ejercicioController.obtenerEjercicioPorId);

router.post("/", ejercicioController.crearEjercicio);

router.put("/:id", ejercicioController.actualizarEjercicio);

module.exports = router;