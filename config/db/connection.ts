const ADODB = require('node-adodb');
const path = require('path');
//const sql = require('mssql');

import { Sequelize } from 'sequelize';
import { ObraModel } from '../../models/obra.model';
import { CooperadorModel } from '../../models/cooperador.model';
import { CarteraVencidaModel } from '../../models/carteraVencida.model';
import { ProgramaModel } from '../../models/programa.model';


let dbPostgres: Sequelize;
let dbAccess: any;
//let configSQLServer: any;
let dbSqlServer: Sequelize;

const initConnections = async () => {

  const pathAccess = global.ENVGLOBAL.ACCESS.HOST || 'C:/Fidoc/obrasdb992007.accdb';
  const dbPath = path.join(pathAccess);

  dbPostgres = new Sequelize({
    dialect: "postgres",
    host: global.ENVGLOBAL.POSTGRESQL.HOST || 'localhost',
    port: Number(global.ENVGLOBAL.POSTGRESQL.PORT) || 5432,
    database: global.ENVGLOBAL.POSTGRESQL.DATABASE || 'gisfidoc',
    username: global.ENVGLOBAL.POSTGRESQL.USER_NAME || 'postgres',
    password: global.ENVGLOBAL.POSTGRESQL.USER_PASSWORD || 'root',
  });
/* 
  configSQLServer = {
    user: global.ENVGLOBAL.SQL.USER_NAME,
    password: global.ENVGLOBAL.SQL.USER_PASSWORD,
    server: global.ENVGLOBAL.SQL.HOST,
    database: global.ENVGLOBAL.SQL.DATABASE,
    options: {
      encrypt: global.ENVGLOBAL.SQL.ENCRYPT,
      trustServerCertificate: true
    }
  }; */

  dbAccess = ADODB.open(
    `Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${global.ENVGLOBAL.ACCESS.USER_PASSWORD};Data Source=${dbPath};Persist Security Info=False;`,
    true
  );

  dbSqlServer = new Sequelize(global.ENVGLOBAL.SQL.DATABASE, global.ENVGLOBAL.SQL.USER_NAME, global.ENVGLOBAL.SQL.USER_PASSWORD, {
    host: global.ENVGLOBAL.SQL.HOST, // o la IP de tu servidor
    dialect: 'mssql',
    dialectModule: require('tedious'),
    dialectOptions: {
      options: {
        encrypt: global.ENVGLOBAL.SQL.ENCRYPT, // Pon true si usas conexión segura (Azure por ejemplo)
        trustServerCertificate: true, // Útil en local
      }
    },
    logging: false // Para desactivar logs de SQL
  });
  

  ObraModel();
  CooperadorModel();
  CarteraVencidaModel();
  ProgramaModel();

  console.log("Conexiones inicializadas correctamente.");
};

/* const conectarBDSQLServer = async () => {
  try {
    await sql.connect(configSQLServer);
    console.log("Database SQL Server online");
    await sql.close();
  } catch (err) {
    console.error('Error de conexión:', err);
    await sql.close();
  }
}; */

export {
  initConnections,
  //conectarBDSQLServer,
  dbPostgres,
  dbAccess,
  //configSQLServer,
  dbSqlServer,
  //sql
};
