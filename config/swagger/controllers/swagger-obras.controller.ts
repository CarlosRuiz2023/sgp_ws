export class SwaggerObraController {
    tag: any = {
        name: "obras",
        description: "Operaciones relacionadas con las obras (Access y SQL)"
    };

    public getObrasAccess = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener todas las obras (Access)",
            operationId: "getObrasAccess",
            responses: {
                200: { description: "Operación exitosa" },
                404: { description: "No se encontraron obras" }
            }
        }
    };

    public getObraAccess = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener obra por clave (Access)",
            operationId: "getObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Obra encontrada" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public postObraAccess = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar una nueva obra (Access)",
            operationId: "postObraAccess",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Datos de la obra",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Obra"
                    }
                }
            ],
            responses: {
                201: { description: "Obra creada exitosamente" },
                400: { description: "Datos inválidos" }
            }
        }
    };

    public putObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar obra (Access)",
            operationId: "putObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Obra"
                    }
                }
            ],
            responses: {
                200: { description: "Obra actualizada exitosamente" },
                400: { description: "Datos inválidos" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public putEstatusObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Cambiar estatus de la obra (Access)",
            operationId: "putEstatusObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Estatus actualizado" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public putCostoObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Incrementar costo de obra (Access)",
            operationId: "putCostoObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Costo actualizado" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public deleteObraAccess = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar obra (Access)",
            operationId: "deleteObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Obra eliminada" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public getObrasSql = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener todas las obras (SQL)",
            operationId: "getObrasSql",
            responses: {
                200: { description: "Operación exitosa" },
                404: { description: "No se encontraron obras" }
            }
        }
    };

    public getObraSql = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener obra por clave (SQL)",
            operationId: "getObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Obra encontrada" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public postObraSql = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar nueva obra (SQL)",
            operationId: "postObraSql",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Datos de la obra",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Obra"
                    }
                }
            ],
            responses: {
                201: { description: "Obra creada exitosamente" },
                400: { description: "Datos inválidos" }
            }
        }
    };

    public putObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar obra (SQL)",
            operationId: "putObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Obra"
                    }
                }
            ],
            responses: {
                200: { description: "Obra actualizada exitosamente" },
                400: { description: "Datos inválidos" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public putEstatusObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Cambiar estatus de obra (SQL)",
            operationId: "putEstatusObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Estatus actualizado" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public putCostoObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Incrementar costo de obra (SQL)",
            operationId: "putCostoObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Costo actualizado" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public deleteObraSql = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar obra (SQL)",
            operationId: "deleteObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                200: { description: "Obra eliminada" },
                404: { description: "Obra no encontrada" }
            }
        }
    };

    public definitions = {
        Obra: {
            type: "object",
            properties: {
                obr_clv: { type: "string" },
                nombre: { type: "string" },
                estatus: { type: "string" },
                costo: { type: "number" }
                // Agrega más campos si es necesario
            },
            required: ["obr_clv", "nombre"]
        }
    };
}
