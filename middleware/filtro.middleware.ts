import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
const UTIL_LOG_ERROR = new UtilLogError();

export class FiltroMiddleware {

    public async validarLimit(req: Request, res: Response, next: NextFunction) {
        try {

            const { limit } = req.body;

            if (limit === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el limit",
                });
                return;
            }

            if (typeof limit != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El limit proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (limit <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El limit debe de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarLimit: '+error.message,
            });
        }
    }

    public async validarPage(req: Request, res: Response, next: NextFunction) {
        try {

            const { page } = req.body;

            if (page === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el page",
                });
                return;
            }

            if (typeof page != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El page proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (page <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El page debe de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarPage: '+error.message,
             });
        }
    }

    public async validarFiltro(req: Request, res: Response, next: NextFunction) {
        try {
            const { filtro } = req.body;
    
            if (filtro === undefined || filtro === null) {
                return res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Faltó proporcionar el parámetro 'filtro'."
                });
            }
    
            const estatusInt = parseInt(filtro);
    
            if (!isNaN(estatusInt)) {
                // Si es número, validar rango
                if (estatusInt < 1 || estatusInt > 5) {
                    return res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "El valor numérico del 'filtro' debe estar entre 1 y 5."
                    });
                }
            } else if (typeof filtro !== 'string') {
                return res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El 'filtro' debe ser un número entre 1 y 5 o una cadena para búsqueda textual."
                });
            }
    
            // Pasa la validación
            next();
    
        } catch (error:any) {
            console.error(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).json({ 
                code:500,
                success: false,
                data: null,
                message: 'Error en la función validarFiltro: '+error.message,
             });
        }
    }

}