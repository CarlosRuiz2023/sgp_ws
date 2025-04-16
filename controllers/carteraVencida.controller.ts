import { configSQLServer, dbAccess, sql } from "../db/connection";
import { ApiLogsService } from "../services/api_logs.service";
const _ApiLogService = new ApiLogsService();

export class CarteraVencidaController {
  public async actualizarCarteraVencidaSql(data: any) {
    const params = await data;
    const { saldosin, saldocon, incremento, cta_predial } = params;

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('SALDOSIN', sql.Float, parseFloat(saldosin));
    request.input('SALDOCON', sql.Float, parseFloat(saldocon));
    request.input('INCREMENTO_OBRA', sql.Float, parseFloat(incremento));
    request.input('CTA_PREDIAL', sql.VarChar, cta_predial);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[CARTERA_VENCIDA]
        SET [SALDOSIN] = @SALDOSIN + @INCREMENTO_OBRA,
            [SALDOCON] = @SALDOCON + @INCREMENTO_OBRA,
            [INCREMENTO_OBRA] = @INCREMENTO_OBRA
        WHERE [CTA_PREDIAL] = @CTA_PREDIAL
    `);

    let cartera_vencida = null;

    if (result.rowsAffected[0] > 0) {
      // Ejecutar consulta con parámetros
      cartera_vencida = await request.query(`SELECT * FROM [pFidoc].[dbo].[CARTERA_VENCIDA] WHERE [CTA_PREDIAL] = @CTA_PREDIAL`);
    }
    return cartera_vencida.recordset[0];
  }
}