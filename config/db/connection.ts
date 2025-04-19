// src/db/connection.ts
import { Sequelize } from 'sequelize';
const ADODB = require('node-adodb');
const path = require('path');
const sql = require('mssql');

declare var ENVGLOBAL: any;

let dbPostgres: Sequelize;
let dbAccess: any;
let configSQLServer: any;

const initConnections = async () => {

  const pathAccess = ENVGLOBAL.ACCESS.HOST || 'C:/Fidoc/obrasdb992007.accdb';
  const dbPath = path.join(pathAccess);

  dbPostgres = new Sequelize({
    dialect: "postgres",
    host: ENVGLOBAL.POSTGRESQL.HOST || 'localhost',
    port: Number(ENVGLOBAL.POSTGRESQL.PORT) || 5432,
    database: ENVGLOBAL.POSTGRESQL.DATABASE || 'gisfidoc',
    username: ENVGLOBAL.POSTGRESQL.USER_NAME || 'postgres',
    password: ENVGLOBAL.POSTGRESQL.USER_PASSWORD || 'root',
  });

  configSQLServer = {
    user: ENVGLOBAL.SQL.USER_NAME,
    password: ENVGLOBAL.SQL.USER_PASSWORD,
    server: ENVGLOBAL.SQL.HOST,
    database: ENVGLOBAL.SQL.DATABASE,
    options: {
      encrypt: ENVGLOBAL.SQL.ENCRYPT,
      trustServerCertificate: true
    }
  };

  dbAccess = ADODB.open(
    `Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${ENVGLOBAL.ACCESS.USER_PASSWORD};Data Source=${dbPath};Persist Security Info=False;`,
    true
  );

  console.log("Conexiones inicializadas correctamente.");
};

const conectarBDSQLServer = async () => {
  try {
    await sql.connect(configSQLServer);
    console.log("Database SQL Server online");
    await sql.close();
  } catch (err) {
    console.error('Error de conexión:', err);
    await sql.close();
  }
};

export {
  initConnections,
  conectarBDSQLServer,
  dbPostgres,
  dbAccess,
  configSQLServer,
  sql
};
