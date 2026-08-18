const express = require("express");

const app = express();

app.use(express.json());

const ejercicioRoutes = require("./routes/ejercicio.routes");

app.use(express.json());

app.use("/api/ejercicios", ejercicioRoutes);

app.get("/health", (req, res) => {
    res.json({
        ok: true,
        mensaje: "Backend funcionando"
    });
});

module.exports = app;

app.get("/health", (req, res) => {
    res.json({
        ok: true,
        mensaje: "Backend funcionando"
    });
});

module.exports = app;