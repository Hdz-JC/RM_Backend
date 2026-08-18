const { z } = require("zod");

const crearRutinaSchema = z.object({
    cliente_id: z.uuid(),

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

const actualizarRutinaSchema = z.object({
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

const agregarEjercicioRutinaSchema = z.object({
    ejercicio_id: z.uuid(),

    series: z
        .number()
        .int()
        .positive(),

    repeticiones: z
        .number()
        .int()
        .positive(),

    orden: z
        .number()
        .int()
        .positive(),

    comentarios: z
        .string()
        .optional()
        .nullable()
});

module.exports = {
    crearRutinaSchema,
    actualizarRutinaSchema,
    idRutinaSchema,
    agregarEjercicioRutinaSchema
};