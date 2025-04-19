// EN ARCHIVO DE PRODUCTIVO UNICAMENTE DAR DE ALTA LAS VARIABLES DE ENTORNO
// MODIFICAR A LA PAR ARCHIVO DE INTEGRACION - cargar-variables-prod-vers
// DAR DE ALTA VARIABLES EN GITLAB Y VERIFICAR PARSEO

import { UtilBoolean } from "../../utils/UtilBoolean";
const _UtilBoolean = new UtilBoolean();

export default {
  API: {
    ENVIRONMENT: "PRODUCTIVO",
    NAME: process.env.APP_NAME, // NO MOVER
    PORT: process.env.PROD_API_PORT, // NO MOVER
    VERSION: process.env.APP_VERSION, // NO MOVER
    SECRET_KEY: process.env.PROD_API_SECRET_KEY,
    CORS: process.env.PROD_API_CORS,  // lista de cors se separan por una coma
    DEBUG: true // ver logs en terminal
  },

  SERVICES: {
    API_LOGS: {
      ENVIRONMENT: "PROD",
      NAME: "CENTRALIZADO_LOGS",
      BASE_URI: process.env.PROD_LOGS_BASE_URI,
      KEY: process.env.PROD_LOGS_KEY, // secret token de la api
      CLIENT_ID: process.env.PROD_LOGS_CLIENT_ID,
      SECRET_KEY: process.env.PROD_LOGS_SECRET_KEY,
      SCOPE: process.env.PROD_LOGS_SCOPE,
      APLICATIVO: process.env.PROD_LOGS_APLICATIVO, // id de la aplicacion - este es unico por app
    },
    IDENTITY_FUNCIONARIO: {
      NAME: "IDENTITY_FUNCIONARIO",
      BASE_URI: process.env.PROD_IDENTITYF_BASE_URI,
      CLIENT_ID: process.env.PROD_IDENTITYF_CLIENT_ID,
      CLIENT_SECRET: process.env.PROD_IDENTITYF_CLIENT_SECRET,
      GRANT_TYPE: process.env.PROD_IDENTITYF_GRANT_TYPE,
      SCOPES: process.env.PROD_IDENTITYF_SCOPES,
    }
  },


  SWAGGER: {
    ENVIRONMENT: "PROD",
    TITLE: "API",
    HOST: process.env.PROD_SWAGGER_HOST,
    BASE_PATH: process.env.PROD_SWAGGER_BASE_PATH,
    EMAIL: process.env.PROD_SWAGGER_EMAIL,
  },

  MONGODB: {
    ENVIRONMENT: "PROD",
    HOST: process.env.PROD_MONGO_HOST,
    PORT: process.env.PROD_MONGO_PORT,
    USER_NAME: process.env.PROD_MONGO_USER_NAME,
    USER_PASSWORD: process.env.PROD_MONGO_USER_PASSWORD,
    DATABASE: process.env.PROD_MONGO_DATABASE,
  },
  MYSQL: {
    ENVIRONMENT: "PROD",
    HOST: process.env.PROD_MYSQL_HOST,
    PORT: process.env.PROD_MYSQL_PORT,
    USER_NAME: process.env.PROD_MYSQL_USER_NAME,
    USER_PASSWORD: process.env.PROD_MYSQL_USER_PASSWORD,
    DATABASE: process.env.PROD_MYSQL_DATABASE,
  },
  SQL: {
    ENVIRONMENT: "PROD",
    HOST: process.env.PROD_SQL_HOST,
    PORT: process.env.PROD_SQL_PORT,
    USER_NAME: process.env.PROD_SQL_USER_NAME,
    USER_PASSWORD: process.env.PROD_SQL_USER_PASSWORD,
    DATABASE: process.env.PROD_SQL_DATABASE,
    ENCRYPT: _UtilBoolean.toBoolean(process.env.PROD_SQL_ENCRYPT),
  },
  PAGOS:{
    HOST: "http://localhost:49947",
  }
};
