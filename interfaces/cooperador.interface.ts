import type { Request, Response } from "express";
import { CooperadorController } from "../controllers/cooperador.controller";
import { UtilRequest } from "../utils/UtilRequest";
const _UtilRequest = new UtilRequest();
const _COOPERADOR_CONTROLLER = new CooperadorController();

export class CooperadorInterface {

    public async obtenerCooperadorAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COOPERADOR_CONTROLLER.obtenerCooperadorAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }
}