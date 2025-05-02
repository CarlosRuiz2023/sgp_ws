// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Cooperador:any;

const CooperadorModel = async () => {

  Cooperador = dbPostgres.define('Cooperador', {
    midcoop: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    mapellidop: {
      type: DataTypes.STRING
    },
    mapellidom: {
      type: DataTypes.STRING
    },
    mnombres:{
      type:DataTypes.STRING
    },
    mcallecoop:{
      type:DataTypes.STRING
    },
    mcolcoop:{
      type:DataTypes.STRING
    },
    mnooficial_ext:{
      type:DataTypes.STRING
    },
    mnooficial_int:{
      type:DataTypes.STRING
    },
    mtelcoop:{
      type:DataTypes.STRING
    },
    mnomficha:{
      type:DataTypes.STRING
    },
    mestado:{
      type:DataTypes.STRING
    },
    mpais:{
      type:DataTypes.STRING
    },
    mcorreo:{
      type:DataTypes.STRING
    },
    usrcre:{
      type:DataTypes.STRING
    },
    feccre:{
      type:DataTypes.DATE
    },
    usrmod:{
      type:DataTypes.STRING
    },
    fecmod:{
      type:DataTypes.DATE,
    },
    mcurp:{
      type:DataTypes.STRING
    },
    mrelacionpredio:{
      type:DataTypes.BIGINT
    },
    ine:{
      type:DataTypes.STRING,
    },
    doc_identific:{
      type:DataTypes.STRING
    }
  }, {
    tableName: 'mcoop',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  CooperadorModel,
  Cooperador
}