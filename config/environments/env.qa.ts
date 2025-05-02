export default {
  API: {
    ENVIRONMENT: "QA",
    NAME: "API TYPESCRIPT",
    PORT: 3500,
    VERSION: "1.0.0",
    SECRET_KEY: "*FIDOC_2025*",
    CORS: "*,localhost,localhost:4200", // lista de cors se separan por una coma
    DEBUG: false // ver logs en terminal
  },

  SWAGGER: {
    ENVIRONMENT: "QA",
    TITLE: "API",
    HOST: 'localhost:3500',
    BASE_PATH: '/v1',
    EMAIL: 'juan.ruiz@leon.gob.mx'
  },

  ACCESS: {
    ENVIRONMENT: "QA",
    HOST: "\\192.1.126.122\fidoc_respaldos\apps\fidoc\base\obrasdb992007.accdb",
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
    ENVIRONMENT: "QA",
    HOST: "http://localhost:49947",
  }
};