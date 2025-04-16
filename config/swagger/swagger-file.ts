import { SwaggerDemoController } from "./controllers/swagger-demo.controller";

var _SwaggerDemoController = new SwaggerDemoController();

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
                _SwaggerDemoController.tag
            ],
            
            "paths": {
                '/demo/test':_SwaggerDemoController.getTest
            },
            "externalDocs": {
                "description": "Find out more about Swagger",
                "url": "http://swagger.io"
            }
        }
    }

}