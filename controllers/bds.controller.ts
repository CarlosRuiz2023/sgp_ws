import { dbAccess } from "../config/db/connection";
import { ObraPostgreSQL } from "../models/obraPostgreSQL.model";
import { UtilQuerys } from "../utils/UtilQuerys";

const _UtilQuerys = new UtilQuerys();

export class DBsController {
  public async actualizarBDSPostgreSQLAccess() {
    const obrasAccess = await dbAccess.query(`select * from obra;`);
    if(_UtilQuerys.validarRespuestaFindAccess(obrasAccess)) return "Respuesta de BD invalida";
    const obrasPostgreSQL =await ObraPostgreSQL.findAll();
    if(_UtilQuerys.validarRespuestaFindAllSQLServer(obrasPostgreSQL)) return "Respuesta de BD invalida";

    //comparar ambas respuestas y obtener obras faltantes para ambas BDs
    const clavesPostgreSQL = obrasPostgreSQL.map((obra: any) => obra.obr_clv);
    const clavesAccess = obrasAccess.map((obra: any) => obra.obr_clv);
    const obrasFaltantesPostgreSQL = obrasAccess.filter((obra: any) => !clavesPostgreSQL.includes(obra.obr_clv));
    const obrasFaltantesAccess = obrasPostgreSQL.filter((obra: any) => !clavesAccess.includes(obra.obr_clv));

    //console.log(obrasFaltantesAccess.length);
    //console.log(obrasFaltantesPostgreSQL.length);
    for (const obra of obrasFaltantesAccess) {
      console.log(obra.obr_clv);
    }
    
    return "BD de Access y BD de PostgreSQL actualizadas correctamente"
  }
}