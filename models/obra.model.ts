// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbSqlServer } from '../config/db/connection';
let Obra:any;

const ObraModel = async () => {

  Obra = dbSqlServer.define('Obra', {
    obr_clv: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    obr_call: {
      type: DataTypes.STRING
    },
    obr_col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    obr_mts:{
      type:DataTypes.FLOAT
    },
    obr_cost:{
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    obr_stat:{
      type:DataTypes.STRING
    },
    obr_int:{
      type:DataTypes.TIME,
      allowNull: false,
    },
    obr_tramo:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    obr_fecha:{
      type:DataTypes.DATE,
      allowNull: false,
    },
    obr_cost_total:{
      type:DataTypes.FLOAT
    },
    obr_inc:{
      type:DataTypes.FLOAT
    },
    obr_contab:{
      type:DataTypes.SMALLINT
    },
    obr_sis:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    col_nom:{
      type:DataTypes.STRING
    },
    obr_digagr:{
      type:DataTypes.TINYINT
    },
    obr_fecinip:{
      type:DataTypes.DATE
    },
    obr_fecvenp:{
      type:DataTypes.DATE
    },
    obr_npago:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    obr_numera:{
      type:DataTypes.STRING
    },
    obr_opergob:{
      type:DataTypes.STRING
    },
    id_obr:{
      type:DataTypes.STRING
    },
    obr_digito:{
      type:DataTypes.TINYINT,
      allowNull: false,
    },
    obr_programa:{
      type:DataTypes.FLOAT
    },
    obr_cuentac:{
      type:DataTypes.STRING
    }
  }, {
    tableName: 'obra',
    schema: 'dbo',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ObraModel,
  Obra
}