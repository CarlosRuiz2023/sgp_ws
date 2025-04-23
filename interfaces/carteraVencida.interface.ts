import type { Request, Response } from "express";
import { CarteraVencidaController } from "../controllers/carteraVencida.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilLogError } from "../utils/UtilLogError";

const _UtilRequest = new UtilRequest();
const _CARTERA_VENCIDA_CONTROLLER = new CarteraVencidaController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class CarteraVencidaInterface {
    public async obtenerCarteraVencidaSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CARTERA_VENCIDA_CONTROLLER.obtenerCarteraVencida(params);
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
    public async actualizarCarteraVencidaSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CARTERA_VENCIDA_CONTROLLER.actualizarCarteraVencidaSql(params);
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