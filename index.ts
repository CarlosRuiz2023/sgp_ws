import Express, { NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import Environment from "./config/helpers/environment.helper"; // HELPER AMBIENTE
import ServerConfig from "./server/server.config";
import Colors from "./utils/colors.utils";
import { AppRouting } from "./routing/app-routing";
import { UtilFecha } from "./utils/UtilFecha";
import swaggerUI from "swagger-ui-express";
import { SwaggerInterface } from "./config/swagger/swagger-interface";
import { initConnections } from "./config/db/connection";
import { Cron as CustomCron } from "./cron/cron";

const _UtilFecha = new UtilFecha();
const environment = Environment();
const color = Colors();
var _SwaggerInterface = new SwaggerInterface();
const Cron = new CustomCron();

(async () => {

  //OBTENEMOS NUESTRAS VARIABLES DE ENTORNO
  const ENV = await environment.environmentInstance();
  //VARIABLE GLOBAL PARA UTILIZAR EN NUESTRA APLICACION
  global.ENVGLOBAL = ENV;

  await initConnections();

  var CORS_WHITE_LIST = ENV.API.CORS.split(',');

  //INSTANCIAMOS EL SERVIDOR
  const www = ServerConfig.getInstance(ENV);

  //CARGAMOS CONFIGURACIONES
  www.api.use(Express.json());
  www.api.use(Express.urlencoded({ extended: true }));

  //CONFIGURACION DE CORS
  const options: cors.CorsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: CORS_WHITE_LIST,
    preflightContinue: false,
  };

  //USO DE CORS
  www.api.use(cors(options));

  //CARGA DE RUTAS
  www.api.use('/api', AppRouting);

  // Carga la documentación Swagger antes de definir la ruta
  const swaggerJson = await _SwaggerInterface.loadConfigFile();

  // SWAGGER
  www.api.use('/api/swagger', swaggerUI.serve);
  www.api.get('/api/swagger/v1', swaggerUI.setup(swaggerJson));

  // info route
  www.api.get('/', (req: any, res: any) => {
    res.status(200).send({
      env: ENV.API.ENVIRONMENT,
      app: ENV.API.NAME,
      version: ENV.API.VERSION,
      msg: "API FUNCIONANDO",
      code: 200,
      method: "/",
      now: _UtilFecha.DateNow(),
    });
  });

  //INICIA SERVIDOR
  www.start(() => {

    if (ENV.API.ENVIRONMENT == 'DEV' || ENV.API.ENVIRONMENT == 'LOCAL') {
      console.log(`Testear ruta: http://localhost:${ENV.API.PORT}`, `http://localhost:${ENV.API.PORT}/api/swagger/v1`);
    }

  });

})();

Cron.iniciarCron();
