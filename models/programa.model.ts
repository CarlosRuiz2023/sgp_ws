// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbSqlServer } from '../config/db/connection';
let Programa:any;

const ProgramaModel = async () => {

  Programa = dbSqlServer.define('Programa', {
    pro_clv: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    pro_nom: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Programa',
    schema: 'dbo',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ProgramaModel,
  Programa
}