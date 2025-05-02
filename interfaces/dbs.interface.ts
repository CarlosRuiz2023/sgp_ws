import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { DBsController } from "../controllers/bds.controller";

const _DBS_CONTROLLER = new DBsController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class DBsInterface {
    public async actualizarAccessPostgreSQL(req: Request, res: Response) {
        try {
            let resultado = await _DBS_CONTROLLER.actualizarBDSPostgreSQLAccess();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerCarteraVencidaSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
    public async actualizarSQLServer(req: Request, res: Response) {
        try {
            let resultado = await _DBS_CONTROLLER.actualizarBDSPostgreSQLAccess();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarCarteraVencidaSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}