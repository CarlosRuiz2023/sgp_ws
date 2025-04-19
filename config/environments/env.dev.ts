export default {
  API: {
    ENVIRONMENT: "DEV",
    NAME: process.env.APP_NAME || "API TYPESCRIPT", // mover solo variable opcional
    PORT: process.env.DEV_API_PORT || 3500, // mover solo variable opcional
    VERSION: process.env.APP_VERSION || "1.0.0", // mover solo variable opcional
    SECRET_KEY: "my-secret-key-DEV",
    CORS: "*,localhost,localhost:4200",  // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SERVICES: {
    API_LOGS: {
      ENVIRONMENT: "DEV",
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
    ENVIRONMENT: "DEV",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'example@leon.gob.mx'
  },

  MONGODB: {
    ENVIRONMENT: "DEV",
    HOST: "asd",
    PORT: "asd",
    USER_NAME: "asd",
    USER_PASSWORD: "asd",
    DATABASE: "asd",
  },
  MYSQL: {
    ENVIRONMENT: "DEV",
    HOST: "asd",
    PORT: "asd",
    USER_NAME: "asd",
    USER_PASSWORD: "asd",
    DATABASE: "asd",
  },
  SQL: {
    ENVIRONMENT: "DEV",
    HOST: "asd",
    PORT: "asd",
    USER_NAME: "asd",
    USER_PASSWORD: "asd",
    DATABASE: "asd",
    ENCRYPT: false
  },
  PAGOS:{
    HOST: "http://localhost:49947",
  }
};
