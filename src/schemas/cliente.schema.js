const { z } = require("zod");


const crearClienteSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar los 100 caracteres"),

    paterno: z
        .string()
        .min(1, "El apellido paterno es obligatorio")
        .max(100, "El apellido paterno no puede superar los 100 caracteres"),

    materno: z
        .string()
        .max(100, "El apellido materno no puede superar los 100 caracteres")
        .optional()
        .nullable()
});


const actualizarClienteSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar los 100 caracteres"),

    paterno: z
        .string()
        .min(1, "El apellido paterno es obligatorio")
        .max(100, "El apellido paterno no puede superar los 100 caracteres"),

    materno: z
        .string()
        .max(100, "El apellido materno no puede superar(100 caracteres")
        .optional()
        .nullable()
});


const idClienteSchema = z.object({
    id: z.uuid()
});


module.exports = {
    crearClienteSchema,
    actualizarClienteSchema,
    idClienteSchema
};