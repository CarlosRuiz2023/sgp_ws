// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let ObraPostgreSQL:any;

const ObraPostgreSQLModel = async () => {

  ObraPostgreSQL = dbPostgres.define('Obra', {
    obr_clv: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    obr_mts: {
      type: DataTypes.DOUBLE
    },
    obr_cost: {
      type: DataTypes.DOUBLE,
    },
    obr_int:{
      type:DataTypes.BIGINT
    },
    obr_fecha:{
      type:DataTypes.DATE,
    },
    obr_cost_total:{
      type:DataTypes.DOUBLE
    },
    obr_inc:{
      type:DataTypes.DOUBLE,
    },
    obr_fecinip:{
      type:DataTypes.DATE,
    },
    obr_fecvenp:{
      type:DataTypes.DATE,
    },
    obr_npago:{
      type:DataTypes.INTEGER
    },
    obr_opergob:{
      type:DataTypes.STRING
    },
    obr_fec_ini_proc:{
      type:DataTypes.DATE
    },
    obr_fec_ini_cob:{
      type:DataTypes.DATE,
    },
    obr_clv_int:{
      type:DataTypes.BIGINT,
      allowNull: false,
    },
    obr_prog2:{
      type:DataTypes.BIGINT
    },
    obr_clv2:{
      type:DataTypes.STRING
    },
    obr_status:{
      type:DataTypes.INTEGER
    },
    oid:{
      type:DataTypes.BIGINT,
    },
    obr_fec_canc:{
      type:DataTypes.DATE
    },
    obr_sis:{
      type:DataTypes.STRING
    },
    col_clv2:{
      type:DataTypes.STRING
    },
    no_contrato:{
      type:DataTypes.STRING,
    },
    gastos_admvos:{
      type:DataTypes.DOUBLE
    },
    obr_fec_pub1:{
      type:DataTypes.DATE
    },
    obr_fec_pub2:{
      type:DataTypes.DATE
    },
    evid_pub1:{
      type:DataTypes.STRING
    },
    evid_pub2:{
      type:DataTypes.STRING
    },
    evid_obra_proc:{
      type:DataTypes.STRING
    },
    evid_termino_obra:{
      type:DataTypes.STRING
    },
    obr_nat:{
      type:DataTypes.STRING
    }
  }, {
    tableName: 'obras2',
    schema: 'public2',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ObraPostgreSQLModel,
  ObraPostgreSQL
}