export default {
  API: {
    ENVIRONMENT: "DEV",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "DEV",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/api',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },

  ACCESS: {
    ENVIRONMENT: "DEV",
    HOST: "C:/Fidoc/obrasdb992007.accdb",
    USER_PASSWORD: "LEONFIDOC",
  },
  POSTGRESQL: {
    ENVIRONMENT: "DEV",
    HOST: "localhost",
    PORT: "5432",
    USER_NAME: "postgres",
    USER_PASSWORD: "root",
    DATABASE: "gisfidoc",
  },
  SQL: {
    ENVIRONMENT: "DEV",
    HOST: "localhost",
    PORT: "1433",
    USER_NAME: "prueba",
    USER_PASSWORD: "root",
    DATABASE: "pfidoc",
    ENCRYPT: false
  },
  PAGOS:{
    ENVIRONMENT: "DEV",
    HOST: "http://localhost:49947",
  }
};
