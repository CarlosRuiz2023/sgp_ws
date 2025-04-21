import { Sequelize } from "sequelize";
import { configSQLServer, dbAccess, sql } from "../config/db/connection";
import { CarteraVencida } from "../models/carteraVencida.model";
import { Cooperador } from "../models/cooperador.model";
import { Obra } from "../models/obra.model";
import { ApiLogsService } from "../services/api_logs.service";
import { UtilFecha } from "../utils/UtilFecha";

const _UtilFecha = new UtilFecha();
const _ApiLogService = new ApiLogsService();

export class ObraController {
  public async obtenerObrasAccess(data: any) {
    const params = await data;
    const { limit, page } = params;
    // Obtener todos los registros ordenados por fecha
    const sql = `SELECT * FROM obra ORDER BY obr_fecha DESC`;
    const allObras = await dbAccess.query(sql);

    // Calcular el offset y aplicar paginación manual
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
    return obra;
  }

  public async agregarObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${obr_call}','${obr_col}',${obr_cost},'${obr_stat}','${obr_tramo}','${obr_fecha}','${obr_sis}','${col_nom}','${obr_programa}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
    let obra = null;
    try {
      await dbAccess.query(query);
    } catch (error) {
    }
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    return obra;
  }

  public async actualizarObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    try {
      await dbAccess.query(`UPDATE obra set obr_call='${obr_call}',obr_col='${obr_col}',obr_cost=${obr_cost},obr_stat='${obr_stat}',obr_tramo='${obr_tramo}',obr_fecha='${obr_fecha}',obr_sis='${obr_sis}',col_nom ='${col_nom}',obr_programa='${obr_programa}',obr_fecinip='${obr_fecinip}',obr_fecvenp='${obr_fecvenp}',obr_npago=${obr_npago},obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }
    let obra = null;
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    return obra;
  }

  public async actualizarEstatusObraAccess(data: any) {
    const params = await data;
    const { obr_clv, obr_stat, obr_opergob } = params;
    try {
      await dbAccess.query(`UPDATE obra set obr_stat='${obr_stat}',obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }
    let obra = null;

    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
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
    return obra;
  }

  public async eliminarObraAccess(data: any) {
    const params = await data;
    const { obr_clv } = params;
    let obra = null;
    let message = '';
    try {
      await dbAccess.query(`DELETE FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {
    }
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (obra != null) {
      message = 'No se elimino la obra.'
    } else {
      message = 'Obra eliminada correctamente.'
    }
    return message;
  }

  public async obtenerObrasSql(data: any) {
    const params = await data;
    const { limit, page } = params;
    const offset = (page - 1) * limit;
    // Conectar a la base de datos
    /* await sql.connect(configSQLServer);
    // Obtener el total de registros
    const totalResult = await sql.query(`
      SELECT COUNT(*) as total FROM [pFidoc].[dbo].[obra]
    `);
    const total = totalResult.recordset[0].total;
    const result = await sql.query(`
      SELECT * FROM [pFidoc].[dbo].[obra]
      ORDER BY obr_fecha DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `);
    await sql.close();
    return {
      total,
      page,
      limit,
      obras: result.recordset
    }; */
    const { count: total, rows: obras } = await Obra.findAndCountAll({
      limit,
      offset,
      order: [['obr_fecha', 'DESC']]
    });

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
    /* let obra = null;
    // Conectar a la base de datos
    await sql.connect(configSQLServer);
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    // Ejecutar consulta con parámetros
    obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
    await sql.close();
    return obra.recordset[0]; */
    const obra = await Obra.findOne({ where: { obr_clv } });
    return obra;
  }

  public async agregarObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;
    const fechaObraSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'
    // Conectar a la base de datos
    /* await sql.connect(configSQLServer);
    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_call', sql.VarChar, obr_call);
    request.input('obr_col', sql.VarChar, obr_col);
    request.input('obr_cost', sql.Float, parseFloat(obr_cost));
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_tramo', sql.VarChar, obr_tramo);
    request.input('obr_fecha', sql.DateTime, fechaObraSQL);
    request.input('obr_sis', sql.VarChar, obr_sis);
    request.input('col_nom', sql.VarChar, col_nom);
    request.input('obr_fecinip', sql.DateTime, fechaInicioSQL);
    request.input('obr_fecvenp', sql.DateTime, fechaVencimientoSQL);
    request.input('obr_npago', sql.VarChar, "" + obr_npago);
    request.input('obr_opergob', sql.VarChar, obr_opergob);
    // Ejecutar consulta con parámetros
    const result = await request.query(`
      INSERT INTO [dbo].[obra]
      ([obr_clv],[obr_call],[obr_col],[obr_mts],[obr_cost],[obr_stat],
      [obr_int],[obr_tramo],[obr_fecha],[obr_cost_total],[obr_inc],
      [obr_contab],[obr_sis],[col_nom],[obr_digito],[obr_programa],
      [obr_cuentac],[obr_digagr],[obr_fecinip],
      [obr_fecvenp],[obr_npago],[obr_numera],[obr_opergob])
      VALUES
      (@obr_clv, @obr_call, @obr_col, 0.0, @obr_cost, @obr_stat,
      '00:00:00.0000000', @obr_tramo, @obr_fecha, 0.0, 0.0,
      0, @obr_sis, @col_nom, 0, 0, '', 0, @obr_fecinip,
      @obr_fecvenp, @obr_npago, '', @obr_opergob)
    `);
    if (result.rowsAffected[0] > 0) {
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);
      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
    }
    return obra.recordset[0]; */
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
    return obra;
  }

  public async actualizarObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = params;

    const fechaObraSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = _UtilFecha.convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'

    // Conectar a la base de datos
    /* await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_call', sql.VarChar, obr_call);
    request.input('obr_col', sql.VarChar, obr_col);
    request.input('obr_cost', sql.Float, parseFloat(obr_cost));
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_tramo', sql.VarChar, obr_tramo);
    request.input('obr_fecha', sql.DateTime, fechaObraSQL);
    request.input('obr_sis', sql.VarChar, obr_sis);
    request.input('col_nom', sql.VarChar, col_nom);
    request.input('obr_fecinip', sql.DateTime, fechaInicioSQL);
    request.input('obr_fecvenp', sql.DateTime, fechaVencimientoSQL);
    request.input('obr_npago', sql.VarChar, "" + obr_npago);
    request.input('obr_opergob', sql.VarChar, obr_opergob);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_call] = @obr_call,
          [obr_col] = @obr_col,
          [obr_cost] = @obr_cost,
          [obr_stat] = @obr_stat,
          [obr_tramo] = @obr_tramo,
          [obr_fecha] = @obr_fecha,
          [obr_sis] = @obr_sis,
          [col_nom] = @col_nom,
          [obr_fecinip] = @obr_fecinip,
          [obr_fecvenp] = @obr_fecvenp,
          [obr_npago] = @obr_npago,
          [obr_opergob] = @obr_opergob
      WHERE [obr_clv] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
    }
    return obra.recordset[0]; */
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
    if(result[0]==1){
      obra = await Obra.findOne({ where: { obr_clv } });
    }
    return obra;
  }

  public async actualizarEstatusObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_stat, obr_opergob } = params;
    // Conectar a la base de datos
    /* await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_opergob', sql.VarChar, obr_opergob);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_stat] = @obr_stat,
          [obr_opergob] = @obr_opergob
      WHERE [obr_clv] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {
      if (obr_stat == '8') {
        // Crear request con parámetros
        const request = new sql.Request();
        request.input('OBRA', sql.VarChar, obr_clv);
        // Ejecutar consulta con parámetros
        await request.query(`
      UPDATE [dbo].[CARPETA_VENCIDA]
      SET [SALDOSIN] = 0.0,
          [SALDOCON] = 0.0
      WHERE [OBRA] = @OBRA
    `);
      }
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);

    }
    return obra.recordset[0]; */
    let obra = null;
    const result = await Obra.update({
      obr_stat,
      obr_opergob
    }, {
      where: { obr_clv }
    });
    if (obr_stat == '8') {
      await CarteraVencida.update({
        SALDOSIN: 0,
        SALDOCON: 0
      }, {
        where: { OBRA: obr_clv }
      });
    }
    if(result[0]==1){
      obra = await Obra.findOne({ where: { obr_clv } });
    }
    return obra;
  }

  public async actualizarCostoObraSql(data: any) {
    const params = await data;
    const { obr_clv, obr_inc } = params;

    // Conectar a la base de datos
    /* await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_inc', sql.Float, obr_inc);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_inc] = @obr_inc
      WHERE [obr_clv] = @obr_clv
    `);

    const result2 = await request.query(`
    UPDATE [dbo].[cooperador]
      SET [coo_inc] = @obr_inc
    WHERE [coo_obr] = @obr_clv
    `);

    const result3 = await request.query(`
    UPDATE [dbo].[CARTERA_VENCIDA]
      SET [INCREMENTO_OBRA] = @obr_inc,
          [COO_INC] = @obr_inc,
          [SALDOSIN] = [SALDOSIN] - [INCREMENTO_OBRA] + @obr_inc,
          [SALDOCON] = [SALDOCON] - [INCREMENTO_OBRA] + @obr_inc
    WHERE [OBRA] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
    }
    return obra.recordset[0]; */
    let obra = null;
    const result = await Obra.update({
      obr_inc
    }, {
      where: { obr_clv }
    });
    await Cooperador.update({
      coo_inc: obr_inc
    }, {
      where: { coo_obr: obr_clv }
    });
    await CarteraVencida.update({
      INCREMENTO_OBRA: obr_inc,
      COO_INC: obr_inc,
      SALDOSIN: Sequelize.literal(`[SALDOSIN] - [SALDOSIN] + ${obr_inc}`),
      SALDOCON: Sequelize.literal(`[SALDOCON] - [SALDOCON] + ${obr_inc}`)
    }, {
      where: { OBRA: obr_clv }
    });
    if(result[0]==1){
      obra = await Obra.findOne({ where: { obr_clv } });
    }
    return obra;
  }

  public async eliminarObraSql(data: any) {
    const params = await data;
    const { obr_clv } = params;
    /* let message = '';
    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);

    // Ejecutar consulta con parámetros
    const result = await request.query(`DELETE FROM [dbo].[obra] WHERE [obr_clv] = @obr_clv`);

    if (result.rowsAffected[0] > 0) {
      message = 'Obra eliminada con exito.';
    } else {
      message = 'No se elimino la obra correctamente.'
    }
    return message; */
    const obra = await Obra.destroy({
      where: { obr_clv }
    });
    if (obra > 0) {
      return 'Obra eliminada exitosamente.';
    } else {
      return 'No se elimino la obra correctamente.'
    }
  }
}