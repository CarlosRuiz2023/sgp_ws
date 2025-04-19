import { configSQLServer, dbAccess, sql } from "../config/db/connection";
import { ApiLogsService } from "../services/api_logs.service";
import { UtilFecha } from "../utils/UtilFecha";

const _UtilFecha = new UtilFecha();
const _ApiLogService = new ApiLogsService();

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
    return cooperador;
  }

  public async agregarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    const query = `INSERT INTO cooperador (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_cp,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
      VALUES('${coo_clv}','${coo_pat}','${coo_mat}','${coo_nom}','${coo_nof}','${coo_call}','','${coo_col}','LEON DE LOS ALDAMA','GUA','${coo_cp}','${coo_tel}','1',0.0,${coo_npag},'${coo_venc1}','${coo_clv.substring(0, coo_clv.length - 3)}',${coo_mts},0.0,'${coo_clv.substring(coo_clv.length - 3)}','${coo_pred}','${coo_pat + " " + coo_mat + " " + coo_nom}',0.0,0.0,0.0,0.0,'01/01/1900','01/01/1900','01/01/1900','01/01/1900',False,'0','0','0','0','01/01/1900',0,False)`;
    try {
      await dbAccess.query(query);
    } catch (error) {

    }
    let cooperador = null;
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    return cooperador;
  }

  public async actualizarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    try {
      await dbAccess.query(`UPDATE cooperador SET coo_pat='${coo_pat}',coo_mat='${coo_mat}',coo_nom='${coo_nom}',coo_nof='${coo_nof}',coo_call='${coo_call}',coo_num='${coo_num}',coo_col='${coo_col}',coo_cp ='${coo_cp}',coo_tel='${coo_tel}',coo_npag=${coo_npag},coo_venc1='${coo_venc1}',coo_mts=${coo_mts},coo_pred='${coo_pred}' WHERE coo_clv = '${coo_clv}'`);
    } catch (error) {

    }

    let cooperador = null;
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    return cooperador;
  }

  public async eliminarCooperadorAccess(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let cooperador = null;
    let message = '';
    try {
      await dbAccess.query(`DELETE FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    } catch (error) {

    }
    cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (cooperador != null) {
      message = 'No se elimino el cooperador.'
    } else {
      message = 'Cooperador eliminado correctamente.'
    }
    return message;
  }

  public async obtenerCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let cooperador = null;
    // Conectar a la base de datos
    await sql.connect(configSQLServer);
    const request = new sql.Request();
    request.input('coo_clv', sql.VarChar, coo_clv);
    // Ejecutar consulta con parámetros
    cooperador = await request.query(`SELECT * FROM [pFidoc].[dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
    await sql.close();
    return cooperador.recordset[0];
  }

  public async agregarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    let cooperador = null;
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(coo_venc1); // '2025-06-12'
    // Conectar a la base de datos
    await sql.connect(configSQLServer);
    // Crear request con parámetros
    const request = new sql.Request();
    request.input('coo_clv', sql.VarChar, coo_clv);
    request.input('coo_pat', sql.VarChar, coo_pat);
    request.input('coo_mat', sql.VarChar, coo_mat);
    request.input('coo_nom', sql.VarChar, coo_nom);
    request.input('coo_nof', sql.VarChar, coo_nof);
    request.input('coo_call', sql.VarChar, coo_call);
    request.input('coo_col', sql.VarChar, coo_col);
    request.input('coo_cp', sql.VarChar, coo_cp);
    request.input('coo_tel', sql.VarChar, coo_tel);
    request.input('coo_npag', sql.VarChar, "" + coo_npag);
    request.input('coo_venc1', sql.DateTime, fechaVencimientoSQL);
    request.input('coo_obr', sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
    request.input('coo_mts', sql.Float, parseFloat(coo_mts));
    request.input('coo_clv1', sql.VarChar, coo_clv.substring(coo_clv.length - 3));
    request.input('coo_pred', sql.VarChar, coo_pred);

    // Ejecutar consulta con parámetros 
    const result = await request.query(`
      INSERT INTO [dbo].[cooperador]
      ([coo_clv],[coo_pat],[coo_mat],[coo_nom],[coo_nof],[coo_call],
      [coo_col],[coo_ciu],[coo_est],[coo_cp],
      [coo_tel],[coo_npag],[coo_venc1],[coo_obr],[coo_mts],
      [coo_clv1],[coo_pred],[coo_nombre],[coo_cargos],
      [coo_propx],[coo_dec],[coo_transferida])
      VALUES
      (@coo_clv, @coo_pat, @coo_mat, @coo_nom, @coo_nof, @coo_call,
      @coo_col, 'LEON DE LOS ALDAMA', 'GUA', @coo_cp,
      @coo_tel, @coo_npag, @coo_venc1, @coo_obr, @coo_mts,
      @coo_clv1, @coo_pred, @coo_pat + ' ' + @coo_mat + ' ' + @coo_nom, 0.0,
      0, 0.0, 0)
    `);
    request.input('obr_clv', sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
    // Ejecutar consulta con parámetros 
    const obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
    // Ejecutar consulta con parámetros 
    const cooperadores = await request.query(`SELECT COUNT(*) AS total FROM [pFidoc].[dbo].[cooperador] WHERE [coo_obr] = @obr_clv`);
    if (obra.recordset[0].obr_programa < 100) {
      if (obra.recordset[0].obr_programa < 10) {
        request.input('pro_clv', sql.VarChar, '00' + obra.recordset[0].obr_programa);;
      } else {
        request.input('pro_clv', sql.VarChar, '0' + obra.recordset[0].obr_programa);;
      }
    } else {
      request.input('pro_clv', sql.VarChar, '' + obra.recordset[0].obr_programa);;
    }
    // Ejecutar consulta con parámetros
    let programa = '';
    if(obra.recordset[0].obr_programa != 0){
     const result = await request.query(`SELECT * FROM [pFidoc].[dbo].[programa] WHERE [pro_clv] = @pro_clv`);
     programa = result.recordset[0].pro_nom;
    }

    if (obra.recordset[0] != null) {
      // Crear request con parámetros
      const request = new sql.Request();
      const date = new Date();
      request.input('OBRA', sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
      request.input('COOPERADOR', sql.VarChar, coo_clv);
      request.input('SALDOSIN', sql.Float, (Number(coo_mts) * Number(obra.recordset[0].obr_cost)));
      request.input('SALDOCON', sql.Float, (Number(coo_mts) * Number(obra.recordset[0].obr_cost)));
      request.input('METROS_FRENTE', sql.Float, Number(coo_mts));
      request.input('COSTO_METRO_LINEAL', sql.Float, Number(obra.recordset[0].obr_cost));
      request.input('CTA_PREDIAL', sql.VarChar, coo_pred);
      request.input('NOMBRE_COOPERADOR', sql.VarChar, coo_pat + " " + coo_mat + " " + coo_nom);
      request.input('NUM_COOPS', sql.Int, Number(cooperadores.recordset[0].total));
      request.input('TRAMO', sql.VarChar, obra.recordset[0].obr_tramo);
      request.input('CALLE', sql.VarChar, coo_call);
      request.input('NO_OFICIAL', sql.VarChar, coo_nof);
      request.input('COLONIA', sql.VarChar, coo_col);
      request.input('SISTEMA', sql.VarChar, obra.recordset[0].obr_sis);
      request.input('PROGRAMA', sql.VarChar, programa);
      request.input('ULTIMA_FECHA_PAGO', sql.DateTime, _UtilFecha.convertirFechaParaSQLServer(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`));
      request.input('OBR_FECHA', sql.DateTime, obra.recordset[0].obr_fecha);

      // Ejecutar consulta con parámetros
      cooperador = await request.query(`
        INSERT INTO [dbo].[CARTERA_VENCIDA]
        ([OBRA],[COOPERADOR],[SALDOSIN],[SALDOCON],[METROS_FRENTE],
        [COSTO_METRO_LINEAL],[CTA_PREDIAL],[NOMBRE_COOPERADOR],[TIPO_LOTE],[COO_INC],[NUM_COOPS],[TRAMO],
        [CALLE],[NO_OFICIAL],[COLONIA],[SISTEMA],[PROGRAMA],[TOTAL_PAGOS],
        [ULTIMA_FECHA_PAGO],[OBR_FECHA])
        VALUES 
        (@OBRA, @COOPERADOR, @SALDOSIN, @SALDOCON, @METROS_FRENTE,
        @COSTO_METRO_LINEAL, @CTA_PREDIAL, @NOMBRE_COOPERADOR,'CASA HABITACION', 0.0, @NUM_COOPS, @TRAMO,
        @CALLE, @NO_OFICIAL, @COLONIA, @SISTEMA, @PROGRAMA, 0.0,
        @ULTIMA_FECHA_PAGO, @OBR_FECHA)
      `);

      request.input('coo_clv', sql.VarChar, coo_clv);

      cooperador = await request.query(`SELECT * FROM [pFidoc].[dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
    }
    return cooperador.recordset[0];
  }

  public async actualizarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = params;
    let cooperador = null;
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(coo_venc1); // '2025-06-12'
    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('coo_clv', sql.VarChar, coo_clv);
    request.input('coo_pat', sql.VarChar, coo_pat);
    request.input('coo_mat', sql.VarChar, coo_mat);
    request.input('coo_nom', sql.VarChar, coo_nom);
    request.input('coo_nof', sql.VarChar, coo_nof);
    request.input('coo_call', sql.VarChar, coo_call);
    request.input('coo_col', sql.VarChar, coo_col);
    request.input('coo_cp', sql.VarChar, coo_cp);
    request.input('coo_tel', sql.VarChar, coo_tel);
    request.input('coo_npag', sql.VarChar, "" + coo_npag);
    request.input('coo_venc1', sql.DateTime, fechaVencimientoSQL);
    request.input('coo_mts', sql.Float, parseFloat(coo_mts));
    request.input('coo_pred', sql.VarChar, coo_pred);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[cooperador]
      SET [coo_pat] = @coo_pat,
          [coo_mat] = @coo_mat,
          [coo_nom] = @coo_nom,
          [coo_nof] = @coo_nof,
          [coo_call] = @coo_call,
          [coo_col] = @coo_col,
          [coo_cp] = @coo_cp,
          [coo_tel] = @coo_tel,
          [coo_npag] = @coo_npag,
          [coo_venc1] = @coo_venc1,
          [coo_mts] = @coo_mts,
          [coo_pred] = @coo_pred
      WHERE [coo_clv] = @coo_clv
    `);

    const result2 = await request.query(`
      UPDATE [dbo].[CARTERA_VENCIDA]
      SET [NOMBRE_COOPERADOR] = @coo_pat+ ' ' + @coo_mat+ ' ' + @coo_nom,
          [CALLE] = @coo_call,
          [NO_OFICIAL] = @coo_nof,
          [COLONIA] = @coo_col,
          [METROS_FRENTE] = @coo_mts,
          [CTA_PREDIAL] = @coo_pred
      WHERE [COOPERADOR] = @coo_clv
      `)

    if (result.rowsAffected[0] > 0 && result2.rowsAffected[0] > 0) {
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('coo_clv', sql.VarChar, coo_clv);

      // Ejecutar consulta con parámetros
      cooperador = await request.query(`SELECT * FROM [pFidoc].[dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
    }
    return cooperador.recordset[0];
  }

  public async eliminarCooperadorSql(data: any) {
    const params = await data;
    const { coo_clv } = params;
    let message = '';
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('coo_clv', sql.VarChar, coo_clv);

    // Ejecutar consulta con parámetros
    const result = await request.query(`DELETE FROM [dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);

    // Ejecutar consulta con parámetros
    const result2 = await request.query(`DELETE FROM [dbo].[CARTERA_VENCIDA] WHERE [COOPERADOR] = @coo_clv`);

    if (result.rowsAffected[0] > 0 && result2.rowsAffected[0] > 0) {
      message = 'Cooperador eliminado con exito.';
    } else {
      message = 'No se elimino al cooperador correctamente.'
    }
    return message;
  }
}