import type { Request, Response } from "express";
import { ObraController } from "../controllers/obra.controller";
import { UtilRequest } from "../utils/UtilRequest";
const _UtilRequest = new UtilRequest();
const _DEMO_CONTROLLER = new ObraController();

export class DemoInterface {
    public async test(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _DEMO_CONTROLLER.test(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async registrar_logs(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _DEMO_CONTROLLER.LOG_REGISTER_INFORMATIVO(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async GetAll(req: Request, res: Response) {

    }
}