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

const idRutinaEjercicioSchema = z.object({
    id: z.uuid(),
    idRutinaEjercicio: z.uuid()
});

const agregarEjercicioRutinaSchema = z.object({
    ejercicio_id: z.uuid(),

    dia: z
        .string()
        .min(1, "El día es obligatorio")
        .max(20, "El día no puede superar los 20 caracteres"),

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

const actualizarEjercicioRutinaSchema = z.object({
    ejercicio_id: z.uuid(),

    dia: z
        .string()
        .min(1, "El día es obligatorio")
        .max(20, "El día no puede superar los 20 caracteres"),

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

const agregarEjerciciosLoteRutinaSchema = z.object({
    ejercicios: z
        .array(agregarEjercicioRutinaSchema)
        .min(1, "Debe agregar al menos un ejercicio")
});

module.exports = {
    crearRutinaSchema,
    actualizarRutinaSchema,
    idRutinaSchema,
    idRutinaEjercicioSchema,
    agregarEjercicioRutinaSchema,
    agregarEjerciciosLoteRutinaSchema,
    actualizarEjercicioRutinaSchema
};
