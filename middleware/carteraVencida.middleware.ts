import type { Request, Response, NextFunction } from "express";
import { CarteraVencida } from "../models/carteraVencida.model";
import { UtilLogError } from "../utils/UtilLogError";
const UTIL_LOG_ERROR = new UtilLogError();

export class CarteraVencidaMiddleware {

    public async validarCV_saldosin(req: Request, res: Response, next: NextFunction) {
        try {

            const { saldosin } = req.body;

            if (saldosin === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el saldosin",
                });
                return;
            }

            if (typeof saldosin != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El saldosin proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (saldosin < 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El saldosin debe de ser un numero positivo mayor o igual a 0",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCV_saldosin: '+error.message,
            });
        }
    }

    public async validarCV_saldocon(req: Request, res: Response, next: NextFunction) {
        try {

            const { saldocon } = req.body;

            if (saldocon === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el saldocon",
                });
                return;
            }

            if (typeof saldocon != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El saldocon proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (saldocon < 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El saldocon debe de ser un numero positivo mayor o igual a 0",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCV_saldocon: '+error.message,
            });
        }
    }

    public async validarCV_incremento(req: Request, res: Response, next: NextFunction) {
        try {

            const { incremento } = req.body;

            if (incremento === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el incremento de la obra",
                });
                return;
            }

            if (typeof incremento != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El incremento de la obra proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (incremento < 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El incremento de la obra debe de ser un numero positivo mayor o igual a 0",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCV_incremento: '+error.message,
            });
        }
    }

    public async validarCV_pred(req: Request, res: Response, next: NextFunction) {
        try {

            let { cta_predial } = req.params;

            if (cta_predial === undefined) {
                cta_predial = req.body.cta_predial;
            }

            if (cta_predial === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la cta_predial",
                });
                return;
            }

            if (typeof cta_predial != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La cta_predial proporcionada debe ser de tipo string",
                });
                return;
            }

            if (cta_predial.length > 12) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La cta_predial debe de ser menor a 13 caracteres",
                });
                return;
            }
            const cartera = await CarteraVencida.findOne({ where: {cta_predial} })
            if (!cartera){
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "La cta_predial no se encuentra registrada en pFidoc",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCV_pred: '+error.message,
            });
        }
    }

}