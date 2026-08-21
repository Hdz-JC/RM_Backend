-- CreateTable
CREATE TABLE "ejercicios" (
    "id_ejercicio" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(150) NOT NULL,
    "categoria" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "created_by" UUID,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ejercicios_pkey" PRIMARY KEY ("id_ejercicio")
);

-- CreateTable
CREATE TABLE "plantilla_ejercicio" (
    "id_plantilla_ejercicio" UUID NOT NULL DEFAULT gen_random_uuid(),
    "plantilla_id" UUID NOT NULL,
    "ejercicio_id" UUID NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticiones" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 1,
    "comentarios" TEXT,

    CONSTRAINT "plantilla_ejercicio_pkey" PRIMARY KEY ("id_plantilla_ejercicio")
);

-- CreateTable
CREATE TABLE "plantillas" (
    "id_plantilla" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,
    "comentarios" TEXT,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plantillas_pkey" PRIMARY KEY ("id_plantilla")
);

-- CreateTable
CREATE TABLE "rutina_ejercicio" (
    "id_rutina_ejercicio" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rutina_id" UUID NOT NULL,
    "ejercicio_id" UUID NOT NULL,
    "dia" VARCHAR(20) NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticiones" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 1,
    "comentarios" TEXT,

    CONSTRAINT "rutina_ejercicio_pkey" PRIMARY KEY ("id_rutina_ejercicio")
);

-- CreateTable
CREATE TABLE "rutinas" (
    "id_rutina" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entrenador_id" UUID NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,
    "comentarios" TEXT,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" UUID NOT NULL,

    CONSTRAINT "rutinas_pkey" PRIMARY KEY ("id_rutina")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id_ticket" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" UUID NOT NULL DEFAULT gen_random_uuid(),
    "keycloak_id" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "paterno" VARCHAR(100) NOT NULL,
    "materno" VARCHAR(100),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id_cliente" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entrenador_id" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "paterno" VARCHAR(100) NOT NULL,
    "materno" VARCHAR(100),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateIndex
CREATE INDEX "idx_ejercicios_categoria" ON "ejercicios"("categoria");

-- CreateIndex
CREATE INDEX "idx_ejercicios_created_by" ON "ejercicios"("created_by");

-- CreateIndex
CREATE INDEX "idx_plantilla_ejercicio_ejercicio_id" ON "plantilla_ejercicio"("ejercicio_id");

-- CreateIndex
CREATE INDEX "idx_plantilla_ejercicio_plantilla_id" ON "plantilla_ejercicio"("plantilla_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_plantilla_ejercicio_orden" ON "plantilla_ejercicio"("plantilla_id", "orden");

-- CreateIndex
CREATE INDEX "idx_plantillas_usuario_id" ON "plantillas"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_rutina_ejercicio_ejercicio_id" ON "rutina_ejercicio"("ejercicio_id");

-- CreateIndex
CREATE INDEX "idx_rutina_ejercicio_rutina_id" ON "rutina_ejercicio"("rutina_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_rutina_ejercicio_dia_orden" ON "rutina_ejercicio"("rutina_id", "dia", "orden");

-- CreateIndex
CREATE INDEX "idx_rutinas_cliente_id" ON "rutinas"("cliente_id");

-- CreateIndex
CREATE INDEX "idx_rutinas_entrenador_id" ON "rutinas"("entrenador_id");

-- CreateIndex
CREATE INDEX "idx_tickets_fecha" ON "tickets"("fecha");

-- CreateIndex
CREATE INDEX "idx_tickets_usuario_id" ON "tickets"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_keycloak_id_key" ON "usuarios"("keycloak_id");

-- CreateIndex
CREATE INDEX "idx_clientes_entrenador_id" ON "clientes"("entrenador_id");

-- AddForeignKey
ALTER TABLE "ejercicios" ADD CONSTRAINT "fk_ejercicio_usuario" FOREIGN KEY ("created_by") REFERENCES "usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plantilla_ejercicio" ADD CONSTRAINT "fk_plantilla_ejercicio_ejercicio" FOREIGN KEY ("ejercicio_id") REFERENCES "ejercicios"("id_ejercicio") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plantilla_ejercicio" ADD CONSTRAINT "fk_plantilla_ejercicio_plantilla" FOREIGN KEY ("plantilla_id") REFERENCES "plantillas"("id_plantilla") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plantillas" ADD CONSTRAINT "fk_plantilla_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutina_ejercicio" ADD CONSTRAINT "fk_rutina_ejercicio_ejercicio" FOREIGN KEY ("ejercicio_id") REFERENCES "ejercicios"("id_ejercicio") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutina_ejercicio" ADD CONSTRAINT "fk_rutina_ejercicio_rutina" FOREIGN KEY ("rutina_id") REFERENCES "rutinas"("id_rutina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutinas" ADD CONSTRAINT "fk_rutina_cliente" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id_cliente") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutinas" ADD CONSTRAINT "fk_rutina_entrenador" FOREIGN KEY ("entrenador_id") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "fk_ticket_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "fk_cliente_entrenador" FOREIGN KEY ("entrenador_id") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;
