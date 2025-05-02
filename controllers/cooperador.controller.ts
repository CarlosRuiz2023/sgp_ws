import { dbAccess } from "../config/db/connection";
import { CarteraVencida } from "../models/carteraVencida.model";
import { Cooperador } from "../models/cooperador.model";
import { Obra } from "../models/obra.model";
import { Programa } from "../models/programa.model";
import { UtilFecha } from "../utils/UtilFecha";
import { UtilQuerys } from "../utils/UtilQuerys";

const _UtilFecha = new UtilFecha();
const _UtilQuerys = new UtilQuerys();

export class CooperadorController {

  public async obtenerCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let cooperador = null
    if (coo_clv.length == 13) {
      cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    } else {
      cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
    }
    if (!_UtilQuerys.validarRespuestaFindAccess(cooperador)) return "Respuesta de BD invalida";
    return cooperador;
  }

  public async agregarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    const query = `INSERT INTO cooperador (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_cp,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
      VALUES('${coo_clv}','${coo_pat}','${coo_mat}','${coo_nom}','${coo_nof}','${coo_call}','','${coo_col}','LEON DE LOS ALDAMA','GUA','${coo_cp}','${coo_tel}','1',0.0,${coo_npag},'${coo_venc1}','${coo_clv.substring(0, coo_clv.length - 3)}',${coo_mts},0.0,'${coo_clv.substring(coo_clv.length - 3)}','${coo_pred}','${coo_pat + " " + coo_mat + " " + coo_nom}',0.0,0.0,0.0,0.0,'01/01/1900','01/01/1900','01/01/1900','01/01/1900',False,'0','0','0','0','01/01/1900',0,False)`;
    try {
      await dbAccess.query(query);
    } catch (error) { }
    let cooperador = null;
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(cooperador)) return "Respuesta de BD invalida";
    return cooperador;
  }

  public async actualizarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    try {
      await dbAccess.query(`UPDATE cooperador SET coo_pat='${coo_pat}',coo_mat='${coo_mat}',coo_nom='${coo_nom}',coo_nof='${coo_nof}',coo_call='${coo_call}',coo_num='${coo_num}',coo_col='${coo_col}',coo_cp ='${coo_cp}',coo_tel='${coo_tel}',coo_npag=${coo_npag},coo_venc1='${coo_venc1}',coo_mts=${coo_mts},coo_pred='${coo_pred}' WHERE coo_clv = '${coo_clv}'`);
    } catch (error) { }
    let cooperador = null;
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (!_UtilQuerys.validarRespuestaFindAccess(cooperador)) return "Respuesta de BD invalida";
    return cooperador;
  }

  public async eliminarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let cooperador = null;
    let message = 'Cooperador eliminado correctamente';
    try {
      await dbAccess.query(`DELETE FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    } catch (error) { }
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (_UtilQuerys.validarRespuestaFindAccess(cooperador)) return "Respuesta de BD invalida";
    return message;
  }

  public async obtenerCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let cooperador = null;
    if (coo_clv.length == 13) {
      cooperador = await Cooperador.findOne({ where: { coo_clv: coo_clv } });
    } else {
      cooperador = await Cooperador.findOne({ where: { coo_obr: coo_clv } });
    }
    if (coo_clv.length == 13) {
      if (!_UtilQuerys.validarRespuestaFindOneSQLServer(cooperador)) return "Respuesta de BD invalida";
    }else{
      if (!_UtilQuerys.validarRespuestaFindAllSQLServer(cooperador)) return "Respuesta de BD invalida";
    }
    return cooperador;
  }

  public async agregarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(coo_venc1); // '2025-06-12'
    const cooperador = await Cooperador.create({
      coo_clv,
      coo_pat,
      coo_mat,
      coo_nom,
      coo_nof,
      coo_call,
      coo_col,
      coo_cp,
      coo_tel,
      coo_npag,
      coo_venc1: fechaVencimientoSQL,
      coo_obr: coo_clv.substring(0, coo_clv.length - 3),
      coo_mts,
      coo_clv1: coo_clv.substring(coo_clv.length - 3),
      coo_pred,
      coo_nombre: coo_pat + " " + coo_mat + " " + coo_nom,
      coo_cargos: 0.0,
      coo_propx: 0,
      coo_dec: 0.0,
      coo_transferida: 0
    });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(cooperador)) return "Respuesta de BD invalida";
    const obra = await Obra.findOne({ where: { obr_clv: coo_clv.substring(0, coo_clv.length - 3) } });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(obra)) return "Respuesta de BD invalida";
    if (cooperador && obra) {
      let programa = '';
      let programa_nombre = '';
      if (obra.dataValues.obr_programa < 100) {
        if (obra.dataValues.obr_programa < 10) {
          programa = '00' + obra.dataValues.obr_programa;
        } else {
          programa = '0' + obra.dataValues.obr_programa;
        }
      } else {
        programa = '' + obra.dataValues.obr_programa;
      }
      // Ejecutar consulta con parámetros
      if (obra.dataValues.obr_programa != 0) {
        const programaRecuperado = await Programa.findOne({ where: { pro_clv: programa } });
        if (!_UtilQuerys.validarRespuestaFindOneSQLServer(programaRecuperado)) return "Respuesta de BD invalida";
        programa_nombre = programaRecuperado.dataValues.pro_nom;
      }
      const date = _UtilFecha.DateNow();
      const respuesta = await CarteraVencida.create({
        OBRA: coo_clv.substring(0, coo_clv.length - 3),
        COOPERADOR: coo_clv,
        SALDOSIN: (parseFloat(coo_mts) * Number(coo_mts * obra.dataValues.obr_cost)),
        SALDOCON: (parseFloat(coo_mts) * Number(coo_mts * obra.dataValues.obr_cost)),
        METROS_FRENTE: Number(coo_mts),
        COSTO_METRO_LINEAL: parseFloat(obra.dataValues.obr_cost),
        CTA_PREDIAL: coo_pred,
        NOMBRE_COOPERADOR: cooperador.dataValues.coo_pat + " " + cooperador.dataValues.coo_mat + " " + cooperador.dataValues.coo_nom,
        TIPO_LOTE: 'CASA HABITACION',
        COO_INC: 0.0,
        NUM_COOPS: Number(await Cooperador.count({ where: { coo_obr: coo_clv.substring(0, coo_clv.length - 3) } })),
        TRAMO: obra.dataValues.obr_tramo,
        CALLE: coo_call,
        NO_OFICIAL: coo_nof,
        COLONIA: coo_col,
        SISTEMA: obra.dataValues.obr_sis,
        PROGRAMA: programa_nombre,
        TOTAL_PAGOS: 0.0,
        ULTIMA_FECHA_PAGO: _UtilFecha.convertirFechaParaSQLServer(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`),
        OBR_FECHA: _UtilFecha.convertirFechaParaSQLServer(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
      });
      if (!_UtilQuerys.validarRespuestaFindOneSQLServer(respuesta)) return "Respuesta de BD invalida";
    }
    return cooperador;
  }

  public async actualizarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(coo_venc1); // '2025-06-12'
    const cooperador = await Cooperador.update({
      coo_pat,
      coo_mat,
      coo_nom,
      coo_nof,
      coo_call,
      coo_col,
      coo_cp,
      coo_tel,
      coo_npag,
      coo_venc1: fechaVencimientoSQL,
      coo_mts: parseFloat(coo_mts),
      coo_pred
    }, { where: { coo_clv } });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(cooperador)) return "Respuesta de BD invalida";
    const respuesta = await CarteraVencida.update({
      NOMBRE_COOPERADOR: coo_pat + " " + coo_mat + " " + coo_nom,
      CALLE: coo_call,
      NO_OFICIAL: coo_nof,
      COLONIA: coo_col,
      METROS_FRENTE: parseFloat(coo_mts),
      CTA_PREDIAL: coo_pred
    }, { where: { COOPERADOR: coo_clv } });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(respuesta)) return "Respuesta de BD invalida";
    const cooperadorRecuperado = await Cooperador.findOne({ where: { coo_clv } });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(cooperadorRecuperado)) return "Respuesta de BD invalida";
    return cooperadorRecuperado;
  }

  public async eliminarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let message = 'Cooperador eliminado con exito';
    const cooperador = await Cooperador.destroy({ where: { coo_clv } });
    await CarteraVencida.destroy({ where: { COOPERADOR: coo_clv } });
    if (!_UtilQuerys.validarRespuestaDeleteSQLServer(cooperador)) return "Respuesta de BD invalida";
    return message;
  }
}