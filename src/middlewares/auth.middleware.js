const { createRemoteJWKSet, jwtVerify } = require("jose");

const issuer = "http://localhost:8180/realms/Routines-Manager";

const authService = require("../services/auth.service");

const jwks = createRemoteJWKSet(
    new URL(`${issuer}/protocol/openid-connect/certs`)
);

async function autenticar(req, res, next) {
    try {

        const authorization = req.headers.authorization;

        console.log(
            "Authorization recibido:",
            authorization ? "SI" : "NO"
        );

        if (!authorization) {
            return res.status(401).json({
                mensaje: "Token de autenticación requerido"
            });
        }

        const partes = authorization.split(" ");

        console.log("Tipo:", partes[0]);
        console.log("Partes:", partes.length);

        const tipo = partes[0];
        const token = partes[1];

        console.log(
            "Token tiene 3 partes:",
            token ? token.split(".").length === 3 : false
        );

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                mensaje: "Formato de autorización inválido"
            });
        }

        const { payload } = await jwtVerify(token, jwks, {
            issuer
        });

        console.log("JWT válido");

        const usuario = await authService.obtenerOCrearUsuario(payload);

        console.log("Usuario PostgreSQL:", usuario.id_usuario);

        req.user = payload;
        req.usuario = usuario;

        next();

    } catch (error) {

        console.error(
            "Error de autenticación:",
            error.message
        );

        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
}

module.exports = autenticar;