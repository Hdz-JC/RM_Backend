const express = require("express");

const router = express.Router();

const rutinaController = require("../controllers/rutina.controller");

const validate = require("../middlewares/validate.middleware");

const {
    crearRutinaSchema
} = require("../schemas/rutina.schema");


router.post(
    "/",
    validate(crearRutinaSchema, "body"),
    rutinaController.crearRutina
);


module.exports = router;