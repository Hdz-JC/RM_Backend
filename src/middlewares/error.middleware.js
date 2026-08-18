function errorMiddleware(err, req, res, next) {
    console.error(err);

    // UUID inválido
    if (err.code === "P2007") {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es un UUID válido"
        });
    }

    // Registro no encontrado
    if (err.code === "P2025") {
        return res.status(404).json({
            mensaje: "El ejercicio no existe"
        });
    }

    // Error desconocido
    return res.status(500).json({
        mensaje: "Error interno del servidor"
    });
}

module.exports = errorMiddleware;