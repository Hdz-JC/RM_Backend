const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});

async function obtenerEjercicios() {
    return await prisma.ejercicios.findMany();
}

module.exports = {
    obtenerEjercicios
};