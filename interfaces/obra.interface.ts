import type { Request, Response } from "express";
import { ObraController } from "../controllers/obra.controller";
import { UtilRequest } from "../utils/UtilRequest";
const _UtilRequest = new UtilRequest();
const _OBRA_CONTROLLER = new ObraController();

export class ObraInterface {
    public async obtenerObrasAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObrasAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async obtenerObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.agregarObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarEstatusObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarEstatusObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarCostoObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarCostoObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarObraAccess(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.eliminarObraAccess(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async obtenerObrasSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObrasSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async obtenerObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObraSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.agregarObraSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarObraSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarEstatusObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarEstatusObraSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarCostoObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarCostoObraSql(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarObraSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.eliminarObraSql(params);
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