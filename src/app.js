const express = require("express");

const app = express();

app.use(express.json());

const ejercicioRoutes = require("./routes/ejercicio.routes");

app.use("/api/ejercicios", ejercicioRoutes);

// Middleware de errores
const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;