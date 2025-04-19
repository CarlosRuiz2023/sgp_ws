import { SwaggerObraController } from "./controllers/swagger-obras.controller";

var _SwaggerObraController = new SwaggerObraController();

export class SwaggerFile {

    // dar de alta las rutas del mismo tag
    public async loadConfigFile() {
        return {
            "swagger": "2.0",
            "info": {
                "description": `Environment ${global.ENVGLOBAL.API.ENVIRONMENT}`,
                "version": global.ENVGLOBAL.API.VERSION,
                "title": global.ENVGLOBAL.SWAGGER.TITLE,
                "termsOfService": "http://swagger.io/terms/",
                "contact": {
                    "email": global.ENVGLOBAL.SWAGGER.EMAIL
                },
                "license": {
                    "name": "Apache 2.0",
                    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            },
            "host": global.ENVGLOBAL.SWAGGER.HOST,
            "basePath": global.ENVGLOBAL.SWAGGER.BASE_PATH,
            "schemes": [
                "http",
                "https"
            ],
            "tags": [
                _SwaggerObraController.tag
            ],
            "paths": {
                "/obras/access": _SwaggerObraController.getObrasAccess,
                "/obras/access/:obr_clv": _SwaggerObraController.getObraAccess,
                "/obras/access/agregar": _SwaggerObraController.postObraAccess,
                "/obras/access/actualizar": _SwaggerObraController.putObraAccess,
                "/obras/access/estatus": _SwaggerObraController.putEstatusObraAccess,
                "/obras/access/costo": _SwaggerObraController.putCostoObraAccess,
                "/obras/access/eliminar": _SwaggerObraController.deleteObraAccess,
                "/obras/sql": _SwaggerObraController.getObrasSql,
                "/obras/sql/:obr_clv": _SwaggerObraController.getObraSql,
                "/obras/sql/agregar": _SwaggerObraController.postObraSql,
                "/obras/sql/actualizar": _SwaggerObraController.putObraSql,
                "/obras/sql/estatus": _SwaggerObraController.putEstatusObraSql,
                "/obras/sql/costo": _SwaggerObraController.putCostoObraSql,
                "/obras/sql/eliminar": _SwaggerObraController.deleteObraSql
            },
            "externalDocs": {
                "description": "Find out more about Swagger",
                "url": "http://swagger.io"
            }
        }
    }

}