export default {
  API: {
    ENVIRONMENT: "QA",
    NAME: process.env.APP_NAME || "API TYPESCRIPT", // mover solo variable opcional
    PORT: process.env.QA_API_PORT || 3500, // mover solo variable opcional
    VERSION: process.env.APP_VERSION || "1.0.0", // mover solo variable opcional
    SECRET_KEY: "my-secret-key-QA",
    CORS: "*,localhost,localhost:4200",  // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SERVICES: {
    API_LOGS: {
      ENVIRONMENT: "QA",
      NAME: "CENTRALIZADO_LOGS",
      BASE_URI: "https://busserviciosqa.leon.gob.mx/mongologs/v1",
      KEY: "5JQNYC935J-PWU", // secret token de la api
      CLIENT_ID: "log_demo_client",
      SECRET_KEY: "demo123",
      SCOPE: "demo",
      APLICATIVO: "6619605cbaba1325111916c5", // id de la aplicacion - este es unico por app
    },
    IDENTITY_FUNCIONARIO: {
      NAME: "IDENTITY_FUNCIONARIO",
      BASE_URI: "https://logidentityqa.leon.gob.mx:8081/connect/token",
      CLIENT_ID: "AAAAAAAA",
      CLIENT_SECRET: "AAAAAAAA",
      GRANT_TYPE: "AAAAAAAA",
      SCOPES: "AAAAAAAA",
    }
  },


  SWAGGER: {
    ENVIRONMENT: "QA",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'example@leon.gob.mx'
  },

  ACCESS: {
    ENVIRONMENT: "QA",
    HOST: "C:/Fidoc/obrasdb992007.accdb",
    USER_PASSWORD: "LEONFIDOC",
  },
  POSTGRESQL: {
    ENVIRONMENT: "QA",
    HOST: "172.17.15.21",
    PORT: "5432",
    USER_NAME: "usrfidoc",
    USER_PASSWORD: "Z8XacQ@eb-nA",
    DATABASE: "gisfidoc",
  },
  SQL: {
    ENVIRONMENT: "QA",
    HOST: "192.1.1.24",
    PORT: "1434",
    USER_NAME: "usr_fidoc_qa",
    USER_PASSWORD: "&8stl52u*hLp",
    DATABASE: "pfidoc",
    ENCRYPT: false
  },
  PAGOS:{
    HOST: "http://localhost:49947",
  }
};