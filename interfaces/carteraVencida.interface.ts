import type { Request, Response } from "express";
import { CarteraVencidaController } from "../controllers/carteraVencida.controller";
import { UtilRequest } from "../utils/UtilRequest";
const _UtilRequest = new UtilRequest();
const _CARTERA_VENCIDA_CONTROLLER = new CarteraVencidaController();

export class CarteraVencidaInterface {
    public async actualizarCarteraVencidaSql(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CARTERA_VENCIDA_CONTROLLER.actualizarCarteraVencidaSql(params);
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