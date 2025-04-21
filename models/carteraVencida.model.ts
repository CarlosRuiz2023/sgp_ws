// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbSqlServer } from '../config/db/connection';
let CarteraVencida:any;

const CarteraVencidaModel = async () => {

  CarteraVencida = dbSqlServer.define('CarteraVencida', {
    OBRA: {
      type: DataTypes.STRING,
    },
    COOPERADOR: {
      type: DataTypes.STRING
    },
    TRANSFERIDA: {
      type: DataTypes.STRING
    },
    SALDOSIN:{
      type:DataTypes.FLOAT
    },
    SALDOCON:{
      type:DataTypes.FLOAT
    },
    METROS_FRENTE:{
      type:DataTypes.REAL
    },
    METROS_OBRA:{
      type:DataTypes.FLOAT
    },
    COSTO_METRO_LINEAL:{
      type:DataTypes.FLOAT
    },
    INCREMENTO_OBRA:{
      type:DataTypes.FLOAT
    },
    COSTO_TOTAL_OBRA:{
      type:DataTypes.FLOAT
    },
    COSTO_IMPRESO:{
      type:DataTypes.FLOAT
    },
    TOTAL_DETERMINACION:{
      type:DataTypes.FLOAT
    },
    CTA_PREDIAL:{
      type:DataTypes.STRING,
    },
    NOMBRE_COOPERADOR:{
      type:DataTypes.STRING
    },
    TIPO_LOTE:{
      type:DataTypes.STRING
    },
    COO_INC:{
      type:DataTypes.FLOAT
    },
    NOMBRE_CALLE_NOTIF:{
      type:DataTypes.STRING
    },
    NO_OFICIAL_NOTIF:{
      type:DataTypes.STRING
    },
    NOMBRE_COLONIA_NOTIF:{
      type:DataTypes.STRING
    },
    CIUDAD_NOTIF:{
      type:DataTypes.STRING
    },
    ESTADO_NOTIF:{
      type:DataTypes.STRING
    },
    NUM_COOPS:{
      type:DataTypes.INTEGER
    },
    TRAMO:{
      type:DataTypes.STRING
    },
    CALLE:{
      type:DataTypes.STRING
    },
    NO_OFICIAL:{
      type:DataTypes.STRING
    },
    COLONIA:{
      type:DataTypes.STRING
    },
    SECTOR:{
      type:DataTypes.FLOAT
    },
    NOM_SEC:{
      type:DataTypes.STRING
    },
    SISTEMA:{
      type:DataTypes.STRING
    },
    PROGRAMA:{
      type:DataTypes.STRING
    },
    TOTAL_PAGOS:{
      type:DataTypes.FLOAT
    },
    ULTIMA_FECHA_PAGO:{
      type:DataTypes.STRING
    },
    TOTAL_RECARGOS:{
      type:DataTypes.FLOAT
    },
    TOTAL_GASTOS_EJEC:{
      type:DataTypes.FLOAT
    },
    TOTAL_GASTOS_REQ:{
      type:DataTypes.FLOAT
    },
    PAGO_MES_ANTERIOR:{
      type:DataTypes.STRING
    },
    FOLIO_CONVENIO:{
      type:DataTypes.STRING
    },
    USUARIO:{
      type:DataTypes.STRING
    },
    FECHA_INICIO_PAGOS:{
      type:DataTypes.DATE
    },
    FECHA_VENCIMIENTO:{
      type:DataTypes.DATE
    },
    FECHA_FIRMA_CONV:{
      type:DataTypes.DATE
    },
    VIGENCIA_CONVENIO:{
      type:DataTypes.STRING
    },
    CUMPLIMIENTO_CONVENIO:{
      type:DataTypes.STRING
    },
    COV_OBSERVACIONES:{
      type:DataTypes.STRING
    },
    OBR_FECHA:{
      type:DataTypes.STRING
    },
    DESPACHO:{
      type:DataTypes.STRING
    },
    ssector:{
      type:DataTypes.BIGINT
    },
    subsector:{
      type:DataTypes.BIGINT
    },
    cvecalle:{
      type:DataTypes.BIGINT
    },
  }, {
    tableName: 'CARTERA_VENCIDA',
    schema: 'dbo',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  CarteraVencidaModel,
  CarteraVencida
}