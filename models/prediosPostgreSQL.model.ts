// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let PredioPostgreSQL:any;

const PredioPostgreSQLModel = async () => {

  PredioPostgreSQL = dbPostgres.define('PredioFidocSol', {
    pid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    objectid: {
      type: DataTypes.STRING
    },
    gid_server: {
      type: DataTypes.DOUBLE
    },
    cup:{
      type:DataTypes.STRING
    },
    fecha_cr:{
      type:DataTypes.DATE
    },
    fecha_mo:{
      type:DataTypes.DATE
    },
    tipo:{
      type:DataTypes.STRING
    },
    tipopredio:{
      type:DataTypes.DOUBLE
    },
    ctapredial:{
      type:DataTypes.STRING
    },
    ctaimuvi:{
      type:DataTypes.STRING
    },
    observacio:{
      type:DataTypes.STRING
    },
    shape_area:{
      type:DataTypes.DOUBLE
    },
    shape_len:{
      type:DataTypes.DOUBLE
    },
    geom:{
      type:DataTypes.GEOMETRY
    },
    uso_predio:{
      type:DataTypes.BIGINT
    },
    r20:{
      type:DataTypes.STRING
    },
    nooficial:{
      type:DataTypes.STRING,
    },
    sapal:{
      type:DataTypes.STRING
    },
    usrcre:{
      type:DataTypes.INTEGER
    },
    usrmod:{
      type:DataTypes.INTEGER,
    },
    num_escritura:{
      type:DataTypes.STRING
    },
    reg_escritura:{
      type:DataTypes.STRING
    },
    folio_escritura:{
      type:DataTypes.STRING
    },
    tomo_escritura:{
      type:DataTypes.STRING
    },
    doc_escritura:{
      type:DataTypes.STRING
    },
    lote:{
      type:DataTypes.STRING
    },
    mzna:{
      type:DataTypes.STRING
    },
  }, {
    tableName: 'predios_fidoc_sol',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  PredioPostgreSQLModel,
  PredioPostgreSQL
}