const { z } = require("zod");

const crearRutinaSchema = z.object({
    entrenador_id: z.uuid(),

    usuario_id: z.uuid(),

    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),

    fecha: z
        .string()
        .date()
        .optional(),

    comentarios: z
        .string()
        .optional()
        .nullable()
});

const idRutinaSchema = z.object({
    id: z.uuid()
});

module.exports = {
    crearRutinaSchema,
    idRutinaSchema
};