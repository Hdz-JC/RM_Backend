const express = require("express");

const router = express.Router();

const clienteController = require("../controllers/cliente.controller");

const validate = require("../middlewares/validate.middleware");

const autenticar = require("../middlewares/auth.middleware");

const {
    crearClienteSchema,
    actualizarClienteSchema,
    idClienteSchema
} = require("../schemas/cliente.schema");


router.use(autenticar);


router.get(
    "/",
    clienteController.obtenerClientes
);


router.get(
    "/:id",
    validate(idClienteSchema, "params"),
    clienteController.obtenerClientePorId
);


router.post(
    "/",
    validate(crearClienteSchema, "body"),
    clienteController.crearCliente
);


router.put(
    "/:id",
    validate(idClienteSchema, "params"),
    validate(actualizarClienteSchema, "body"),
    clienteController.actualizarCliente
);


router.delete(
    "/:id",
    validate(idClienteSchema, "params"),
    clienteController.eliminarCliente
);


module.exports = router;