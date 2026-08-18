const express = require("express");

const app = express();

app.use(express.json());

const ejercicioRoutes = require("./routes/ejercicio.routes");
const rutinaRoutes = require("./routes/rutina.routes");

const autenticar = require("./middlewares/auth.middleware");

app.get("/api/auth-test", autenticar, (req, res) => {
    res.json({
        mensaje: "Autenticación correcta",
        keycloak: req.user,
        usuario: req.usuario
    });
});

app.use("/api/ejercicios", ejercicioRoutes);
app.use("/api/rutinas", rutinaRoutes);

// Middleware de errores
const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;