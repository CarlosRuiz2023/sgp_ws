export default {
  API: {
    ENVIRONMENT: "LOCAL",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "my-secret-key-LOCAL",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SERVICES: {
    API_LOGS: {
      ENVIRONMENT: "LOCAL",
      NAME: "CENTRALIZADO_LOGS",
      BASE_URI: "https://busserviciosdev.leon.gob.mx/mongologs/v1",
      KEY: "L4RUGDMONG-28YF", // secret token de la api
      CLIENT_ID: "log_demo_client",
      SECRET_KEY: "demo123",
      SCOPE: "demo",
      APLICATIVO: "6619605cbaba1325111916c5", // id de la aplicacion - este es unico por app
    },
    IDENTITY_FUNCIONARIO: {
      NAME: "IDENTITY_FUNCIONARIO",
      BASE_URI: "https://logidentitydev.leon.gob.mx:8081/connect/token",
      CLIENT_ID: "AAAAAAAA",
      CLIENT_SECRET: "AAAAAAAA",
      GRANT_TYPE: "AAAAAAAA",
      SCOPES: "AAAAAAAA",
    }
  },

  SWAGGER: {
    ENVIRONMENT: "LOCAL",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'example@leon.gob.mx'
  },

  ACCESS: {
    ENVIRONMENT: "LOCAL",
    HOST: "C:/Fidoc/obrasdb992007.accdb",
    USER_PASSWORD: "LEONFIDOC",
  },
  POSTGRESQL: {
    ENVIRONMENT: "LOCAL",
    HOST: "localhost",
    PORT: "5432",
    USER_NAME: "postgres",
    USER_PASSWORD: "root",
    DATABASE: "gisfidoc",
  },
  SQL: {
    ENVIRONMENT: "LOCAL",
    HOST: "localhost",
    PORT: "1433",
    USER_NAME: "prueba",
    USER_PASSWORD: "root",
    DATABASE: "pfidoc",
    ENCRYPT: false
  },
};
