const prisma = require("../config/prisma");

async function obtenerOCrearUsuario(keycloakUser) {

    const keycloakId = keycloakUser.sub;

    let usuario = await prisma.usuarios.findUnique({
        where: {
            keycloak_id: keycloakId
        }
    });

    if (usuario) {
        return usuario;
    }

    usuario = await prisma.usuarios.create({
        data: {
            keycloak_id: keycloakId,
            nombre: keycloakUser.given_name || keycloakUser.preferred_username,
            paterno: keycloakUser.family_name || "Sin apellido",
            materno: null
        }
    });

    return usuario;
}

module.exports = {
    obtenerOCrearUsuario
};