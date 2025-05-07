// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let MovtosFinancPostgreSQL:any;

const MovtosFinancPostgreSQLModel = async () => {

  MovtosFinancPostgreSQL = dbPostgres.define('MovtosFinanc', {
    mov_obra_sifidoc: {
      type: DataTypes.STRING,
    },
    mov_coop_sifidoc: {
      type: DataTypes.STRING
    },
    fec_mov_as400: {
      type: DataTypes.DATE
    },
    usu_sifidoc:{
      type:DataTypes.STRING
    },
    monto_abono_sifidoc:{
      type:DataTypes.DOUBLE
    },
    monto_recargo_sifidoc:{
      type:DataTypes.DOUBLE
    },
    tipo_mov_sifidoc:{
      type:DataTypes.INTEGER
    },
    fec_aplic_mov:{
      type:DataTypes.DATE
    },
    clave_sifidoc:{
      type:DataTypes.STRING
    },
    consecutivo_sifidoc:{
      type:DataTypes.BIGINT
    },
    fid:{
      type:DataTypes.BIGINT
    },
    usucre:{
      type:DataTypes.STRING
    },
    monto_mov:{
      type:DataTypes.DOUBLE
    },
    tipo_mov:{
      type:DataTypes.BIGINT
    },
    id_mov:{
      type:DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    folio_cajas:{
      type:DataTypes.STRING
    },
    cactivo:{
      type:DataTypes.INTEGER,
    }
  }, {
    tableName: 'movtos_financ',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  MovtosFinancPostgreSQLModel,
  MovtosFinancPostgreSQL
}