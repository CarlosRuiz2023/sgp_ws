// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let CapitalPagadoPostgreSQL:any;

const CapitalPagadoPostgreSQLModel = async () => {

  CapitalPagadoPostgreSQL = dbPostgres.define('CapitalPagado', {
    fid: {
      type: DataTypes.BIGINT,
    },
    coop: {
      type: DataTypes.STRING
    },
    capital_pagado: {
      type: DataTypes.DOUBLE
    },
    idpago:{
      type:DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    fec_pago:{
      type:DataTypes.DATE
    }
  }, {
    tableName: 'capital_pagado',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  CapitalPagadoPostgreSQLModel,
  CapitalPagadoPostgreSQL
}