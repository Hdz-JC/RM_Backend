const express = require("express");

const router = express.Router();

const ejercicioController = require("../controllers/ejercicio.controller");

router.get("/", ejercicioController.obtenerEjercicios);

module.exports = router;