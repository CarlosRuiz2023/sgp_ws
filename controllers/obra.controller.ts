import { Op, Sequelize } from "sequelize";
import { dbAccess } from "../config/db/connection";
import { CarteraVencida } from "../models/carteraVencida.model";
import { Cooperador } from "../models/cooperador.model";
import { Obra } from "../models/obra.model";
import { UtilFecha } from "../utils/UtilFecha";
import {UtilQuerys} from "../utils/UtilQuerys";

const _UtilFecha = new UtilFecha();
const _UtilQuerys = new UtilQuerys();

export class ObraController {
  public async obtenerObrasAccess(data: any) {
    const params = await data;
    const { limit, page, filtro } = params;
    let whereSQL = '';
    // Si se manda un número del 1 al 5 => es estatus
    const estatusInt = parseInt(filtro);
    if (!isNaN(estatusInt) && estatusInt >= 1 && estatusInt <= 5) {
      whereSQL = `WHERE obr_stat = '${filtro}'`;
    } else if (filtro) {
      // Si se manda cualquier otro valor => búsqueda por calle
      whereSQL = `WHERE obr_call LIKE '${filtro}'`;
    }
    const sql = `SELECT * FROM obra ${whereSQL} ORDER BY obr_fecha DESC`;
    const allObras = await dbAccess.query(sql);
    if (!_UtilQuerys.validarRespuestaFindAccess(allObras)) return "Respuesta de BD invalida";
    const offset = (page - 1) * limit;
    const paginated = allObras.slice(offset, offset + limit);

    return {
      total: allObras.length,
      page,
      limit,
      obras: paginated
    };
  }

  public async obtenerObraAccess(data: any) {
    const params = await data;
    const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${params.obr_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async agregarObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${obr_call}','${obr_col}',${obr_cost},'${obr_stat}','${obr_tramo}','${obr_fecha}','${obr_sis}','${col_nom}','${obr_programa}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
    let obra = null;
    try {
      await dbAccess.query(query);
    } catch (error) { }
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async actualizarObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    try {
      await dbAccess.query(`UPDATE obra set obr_call='${obr_call}',obr_col='${obr_col}',obr_cost=${obr_cost},obr_stat='${obr_stat}',obr_tramo='${obr_tramo}',obr_fecha='${obr_fecha}',obr_sis='${obr_sis}',col_nom ='${col_nom}',obr_programa='${obr_programa}',obr_fecinip='${obr_fecinip}',obr_fecvenp='${obr_fecvenp}',obr_npago=${obr_npago},obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) { }
    let obra = null;
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async actualizarEstatusObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_stat, obr_opergob } = params;
    try {
      await dbAccess.query(`UPDATE obra set obr_stat='${obr_stat}',obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) { }
    let obra = null;
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async actualizarCostoObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_inc } = params;
    try {
      await dbAccess.query(`UPDATE obra set obr_inc=${obr_inc} WHERE obr_clv = '${obr_clv}'`);
    } catch (error) { }
    try {
      await dbAccess.query(`UPDATE cooperador set coo_inc=${obr_inc} WHERE coo_obr = '${obr_clv}'`)
    } catch (error) { }
    let obra = null;
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async eliminarObraAccess(data: any) {
    const params = await data;
    const { obr_clv } = params;
    let obra = null;
    let message = 'Obra eliminada correctamente';
    try {
      await dbAccess.query(`DELETE FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) { }
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (_UtilQuerys.validarRespuestaFindAccess(obra)) return "Respuesta de BD invalida";
    return message;
  }

  public async obtenerObrasSql(data: any) {
    const params = await data;
    const { limit, page, filtro } = params;
    const offset = (page - 1) * limit;
    const where: any = {};
    const estatusInt = parseInt(filtro);
    if (!isNaN(estatusInt) && estatusInt >= 1 && estatusInt <= 5) {
      where.obr_stat = filtro;
    } else if (filtro) {
      where.obr_call = { [Op.like]: `%${filtro}%` };
    }
    const resp = await Obra.findAndCountAll({
      where,
      limit,
      offset,
      order: [['obr_fecha', 'DESC']]
    });
    if (!_UtilQuerys.validarRespuestaFindAllSQLServer(resp)) return "Respuesta de BD invalida";
    const { count: total, rows: obras } = resp;
    return {
      total,
      page,
      limit,
      obras
    };
  }

  public async obtenerObraSql(data: any) {
    const params = await data;
    const { obr_clv } = params;
    const obra = await Obra.findOne({ where: { obr_clv: obr_clv } });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async agregarObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    const fechaObraSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'
    const obra = await Obra.create({
      obr_clv,
      obr_call,
      obr_col,
      obr_cost,
      obr_stat,
      obr_int: '00:00:00.0000000',
      obr_tramo,
      obr_fecha: fechaObraSQL,
      obr_sis,
      col_nom,
      obr_digito: 0,
      obr_programa,
      fechaInicioSQL,
      fechaVencimientoSQL,
      obr_npago,
      obr_opergob
    });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(obra)) return "Respuesta de BD invalida";
    return obra;
  }

  public async actualizarObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;

    const fechaObraSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'
    let obra = null;
    const result = await Obra.update({
      obr_call,
      obr_col,
      obr_cost,
      obr_stat,
      obr_tramo,
      fechaObraSQL,
      obr_sis,
      col_nom,
      obr_programa,
      fechaInicioSQL,
      fechaVencimientoSQL,
      obr_npago,
      obr_opergob
    }, {
      where: { obr_clv }
    });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result)) return "Respuesta de BD invalida";
    obra = await Obra.findOne({ where: { obr_clv } });
    return obra;
  }

  public async actualizarEstatusObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_stat, obr_opergob } = params;
    let obra = null;
    const result = await Obra.update({
      obr_stat,
      obr_opergob
    }, {
      where: { obr_clv }
    });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result)) return "Respuesta de BD invalida";
    if (obr_stat == '8') {
      const result1 = await CarteraVencida.update({
        SALDOSIN: 0,
        SALDOCON: 0
      }, {
        where: { OBRA: obr_clv }
      });
      if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result1)) return "Respuesta de BD invalida";
    }
    obra = await Obra.findOne({ where: { obr_clv } });
    return obra;
  }

  public async actualizarCostoObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_inc } = params;
    let obra = null;
    const result = await Obra.update({
      obr_inc
    }, {
      where: { obr_clv }
    });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result)) return "Respuesta de BD invalida";
    //const result1 = 
    await Cooperador.update({
      coo_inc: obr_inc
    }, {
      where: { coo_obr: obr_clv }
    });
    //if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result1)) return "Respuesta de BD invalida";
    //const result2 = 
    await CarteraVencida.update({
      INCREMENTO_OBRA: obr_inc,
      COO_INC: obr_inc,
      SALDOSIN: Sequelize.literal(`[SALDOSIN] - [SALDOSIN] + ${obr_inc}`),
      SALDOCON: Sequelize.literal(`[SALDOCON] - [SALDOCON] + ${obr_inc}`)
    }, {
      where: { OBRA: obr_clv }
    });
    //if (!_UtilQuerys.validarRespuestaUpdateSQLServer(result2)) return "Respuesta de BD invalida";
    obra = await Obra.findOne({ where: { obr_clv } });
    return obra;
  }

  public async eliminarObraSql(data: any) {
    const params = await data;
    const { obr_clv } = params;
    const obra = await Obra.destroy({
      where: { obr_clv }
    });
    if (!_UtilQuerys.validarRespuestaDeleteSQLServer(obra)) return "Respuesta de BD invalida";
    return 'Obra eliminada exitosamente.';
  }
}