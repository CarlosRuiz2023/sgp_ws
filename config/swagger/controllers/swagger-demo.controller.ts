export class SwaggerDemoController {
    // dar de alta las rutas del mismo tag
    tag:any = {
        name:"demo",
        description:""
    }

    // ruta demo/test
    public getTest = {
        get: {
            tags: [this.tag.name],
            summary: "ver ruta demo",
            description: "test",
            operationId: "getTest",
            produces: ["application/xml", "application/json"],
            parameters: [],
            responses: {
                200: {
                    description: "Operación Exitosa",
                },
                400: {
                    description: "Dato Invalido",
                },
                404: {
                    description: "Registro no encontrado.",
                },
                405: {
                    description: "Dato Invalido",
                },
            },
            security: [{}],
        },
    }


}