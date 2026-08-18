function validate(schema, property) {
    return (req, res, next) => {

        const resultado = schema.safeParse(req[property]);

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: "Datos inválidos",
                errores: resultado.error.issues
            });
        }

        req[property] = resultado.data;

        next();
    };
}

module.exports = validate;