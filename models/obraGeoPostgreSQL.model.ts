// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let ObraGeoPostgreSQL:any;

const ObraGeoPostgreSQLModel = async () => {

  ObraGeoPostgreSQL = dbPostgres.define('ObraGeo', {
    oid: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    geom: {
      type: DataTypes.GEOMETRY,
    },
    idsol: {
      type: DataTypes.BIGINT,
    },
    tramo:{
      type:DataTypes.STRING,
    },
    sector:{
      type:DataTypes.BIGINT,
    },
    subsector:{
      type:DataTypes.BIGINT
    },
    cvecalle:{
      type:DataTypes.BIGINT,
    },
    idpoligono:{
      type:DataTypes.BIGINT,
    },
    calle:{
      type:DataTypes.STRING,
    },
    colonia:{
      type:DataTypes.STRING
    },
    id_implan:{
      type:DataTypes.DOUBLE
    },
    usrmod:{
      type:DataTypes.BIGINT
    },
    fec_mod:{
      type:DataTypes.DATE,
    },
    limite1:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    limite2:{
      type:DataTypes.STRING
    }
  }, {
    tableName: 'obra_geo',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ObraGeoPostgreSQLModel,
  ObraGeoPostgreSQL
}