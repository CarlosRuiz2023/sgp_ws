import type { Request, Response, NextFunction } from "express";

export class FiltroMiddleware {

    public async validarLimit(req: Request, res: Response, next: NextFunction) {
        try {

            const { limit } = req.body;

            if (limit === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el limit",
                });
                return;
            }

            if (typeof limit != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El limit proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (limit <= 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El limit debe de ser un numero positivo mayor a 0",
                });
                return;
            }

            next();

        } catch (error) {
            console.log(error);
            return res.status(404).send({ msg: 'Token no valido' });
        }
    }

    public async validarPage(req: Request, res: Response, next: NextFunction) {
        try {

            const { page } = req.body;

            if (page === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el page",
                });
                return;
            }

            if (typeof page != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El page proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (page <= 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El page debe de ser un numero positivo mayor a 0",
                });
                return;
            }

            next();

        } catch (error) {
            console.log(error);
            return res.status(404).send({ msg: 'Token no valido' });
        }
    }

    public async validarFiltro(req: Request, res: Response, next: NextFunction) {
        try {
            const { filtro } = req.body;
    
            if (filtro === undefined || filtro === null) {
                return res.status(400).json({
                    success: false,
                    result: null,
                    error: "Faltó proporcionar el parámetro 'filtro'."
                });
            }
    
            const estatusInt = parseInt(filtro);
    
            if (!isNaN(estatusInt)) {
                // Si es número, validar rango
                if (estatusInt < 1 || estatusInt > 5) {
                    return res.status(400).json({
                        success: false,
                        result: null,
                        error: "El valor numérico del 'filtro' debe estar entre 1 y 5."
                    });
                }
            } else if (typeof filtro !== 'string') {
                return res.status(400).json({
                    success: false,
                    result: null,
                    error: "El 'filtro' debe ser un número entre 1 y 5 o una cadena para búsqueda textual."
                });
            }
    
            // Pasa la validación
            next();
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Error en la validación del filtro.' });
        }
    }

}