// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Frente:any;

const FrenteModel = async () => {

  Frente = dbPostgres.define('Frente', {
    fid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    geom: {
      type: DataTypes.GEOMETRY
    },
    mts_frente: {
      type: DataTypes.DOUBLE
    },
    cid:{
      type:DataTypes.BIGINT
    },
    coopid:{
      type:DataTypes.STRING
    },
    pid:{
      type:DataTypes.BIGINT
    },
    oid:{
      type:DataTypes.BIGINT
    },
    obs_grales:{
      type:DataTypes.STRING
    },
    obra_sifidoc:{
      type:DataTypes.STRING
    },
    gid:{
      type:DataTypes.BIGINT
    },
    feccre:{
      type:DataTypes.DATE
    },
    fecmod:{
      type:DataTypes.DATE
    },
    usucre:{
      type:DataTypes.STRING
    },
    usrmod:{
      type:DataTypes.STRING
    },
    prid:{
      type:DataTypes.BIGINT
    },
    inc:{
      type:DataTypes.REAL
    },
    did:{
      type:DataTypes.BIGINT,
    },
    factor_act_pao:{
      type:DataTypes.DOUBLE
    },
    obr_clv_int:{
      type:DataTypes.INTEGER
    },
    coo_clv2:{
      type:DataTypes.BIGINT,
    },
    activo:{
      type:DataTypes.INTEGER
    },
    pae:{
      type:DataTypes.INTEGER
    }
  }, {
    tableName: 'frentes',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  FrenteModel,
  Frente
}