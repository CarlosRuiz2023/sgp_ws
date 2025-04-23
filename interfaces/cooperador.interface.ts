import type { Request, Response } from "express";
import { CooperadorController } from "../controllers/cooperador.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilLogError } from "../utils/UtilLogError";

const _UtilRequest = new UtilRequest();
const _COOPERADOR_CONTROLLER = new CooperadorController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class CooperadorInterface {

    public async obtenerCooperadorAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.obtenerCooperadorAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerCooperadorAccess: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarCooperadorAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.agregarCooperadorAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarCooperadorAccess: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarCooperadorAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.actualizarCooperadorAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarCooperadorAccess: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarCooperadorAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.eliminarCooperadorAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarCooperadorAccess: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async obtenerCooperadorSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.obtenerCooperadorSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerCooperadorSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarCooperadorSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.agregarCooperadorSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarCooperadorSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarCooperadorSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.actualizarCooperadorSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarCooperadorSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarCooperadorSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.eliminarCooperadorSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarCooperadorSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}