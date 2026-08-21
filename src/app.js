const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

const ejercicioRoutes = require("./routes/ejercicio.routes");
const rutinaRoutes = require("./routes/rutina.routes");
const clienteRoutes = require("./routes/cliente.routes");

app.use("/api/ejercicios", ejercicioRoutes);
app.use("/api/rutinas", rutinaRoutes);
app.use("/api/clientes", clienteRoutes);

// Middleware de errores
const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;