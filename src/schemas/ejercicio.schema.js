const { z } = require("zod");

const crearEjercicioSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),

    categoria: z
        .string()
        .min(1, "La categoría es obligatoria")
        .max(100, "La categoría no puede superar los 100 caracteres"),

    descripcion: z
        .string()
        .optional()
        .nullable()
});

const actualizarEjercicioSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),

    categoria: z
        .string()
        .min(1, "La categoría es obligatoria")
        .max(100, "La categoría no puede superar los 100 caracteres"),

    descripcion: z
        .string()
        .optional()
        .nullable()
});

const idEjercicioSchema = z.object({
    id: z.uuid()
});

module.exports = {
    crearEjercicioSchema,
    actualizarEjercicioSchema,
    idEjercicioSchema
};