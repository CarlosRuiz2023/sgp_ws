import { Sequelize } from 'sequelize';
const ADODB = require('node-adodb');
const path = require('path');
const sql = require('mssql');

function createConnections(ENV: any) {
  console.log(process.env);
  const pathAccess = ENV.ACCESS.HOST || 'C:/Fidoc/obrasdb992007.accdb';
  const dbPath = path.join(pathAccess);

  const dbPostgres = new Sequelize({
    dialect: "postgres",
    host: ENV.POSTGRESQL.HOST,
    port: Number(ENV.POSTGRESQL.PORT) || 5432,
    database: ENV.POSTGRESQL.DATABASE,
    username: ENV.POSTGRESQL.USER_NAME,
    password: ENV.POSTGRESQL.USER_PASSWORD,
  });

  const configSQLServer = {
    user: ENV.SQL.USER_NAME,
    password: ENV.SQL.USER_PASSWORD,
    server: ENV.SQL.HOST,
    database: ENV.SQL.DATABASE,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  };

  const dbAccess = ADODB.open(
    `Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${ENV.ACCESS.USER_PASSWORD};Data Source=${dbPath};Persist Security Info=False;`,
    true
  );

  async function conectarBDSQLServer() {
    try {
      await sql.connect(configSQLServer);
      console.log("Database SQL Server online");
      await sql.close();
    } catch (err) {
      console.error('Error de conexión:', err);
      await sql.close();
    }
  }

  return {
    dbPostgres,
    dbAccess,
    conectarBDSQLServer,
    configSQLServer,
  };
}

export { createConnections };
