// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbSqlServer } from '../config/db/connection';
let Cooperador:any;

const CooperadorModel = async () => {

  Cooperador = dbSqlServer.define('Cooperador', {
    coo_clv: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    coo_pat: {
      type: DataTypes.STRING
    },
    coo_mat: {
      type: DataTypes.STRING
    },
    coo_nom:{
      type:DataTypes.STRING
    },
    coo_nof:{
      type:DataTypes.STRING
    },
    coo_call:{
      type:DataTypes.STRING
    },
    coo_num:{
      type:DataTypes.STRING
    },
    coo_col:{
      type:DataTypes.STRING
    },
    coo_ciu:{
      type:DataTypes.STRING
    },
    coo_est:{
      type:DataTypes.STRING
    },
    coo_cp:{
      type:DataTypes.STRING
    },
    coo_tel:{
      type:DataTypes.STRING
    },
    coo_lote:{
      type:DataTypes.STRING
    },
    coo_ant:{
      type:DataTypes.FLOAT
    },
    coo_npag:{
      type:DataTypes.FLOAT
    },
    coo_venc1:{
      type:DataTypes.DATE
    },
    coo_obr:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    coo_mts:{
      type:DataTypes.FLOAT
    },
    coo_inc:{
      type:DataTypes.FLOAT
    },
    coo_clv1:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    coo_pred:{
      type:DataTypes.STRING
    },
    coo_nombre:{
      type:DataTypes.STRING
    },
    coo_pagos:{
      type:DataTypes.FLOAT
    },
    coo_cargos:{
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    coo_gto_req:{
      type:DataTypes.FLOAT
    },
    coo_gto_ejec:{
      type:DataTypes.FLOAT
    },
    coo_notificado:{
      type:DataTypes.DATE
    },
    coo_requerido:{
      type:DataTypes.DATE
    },
    coo_ejecutado:{
      type:DataTypes.DATE
    },
    coo_UltimoAviso:{
      type:DataTypes.DATE
    },
    coo_propx:{
      type:DataTypes.SMALLINT
    },
    coo_rfc:{
      type:DataTypes.STRING
    },
    coo_fiscal:{
      type:DataTypes.STRING
    },
    coo_razonsoc:{
      type:DataTypes.STRING
    },
    coo_grupo:{
      type:DataTypes.STRING
    },
    coo_fecgrupo:{
      type:DataTypes.STRING
    },
    coo_dec:{
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    coo_transferida:{
      type:DataTypes.SMALLINT,
      allowNull: false,
    },
  }, {
    tableName: 'cooperador',
    schema: 'dbo',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  CooperadorModel,
  Cooperador
}