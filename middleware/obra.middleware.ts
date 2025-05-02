import type { Request, Response, NextFunction } from "express";
import { dbAccess } from "../config/db/connection";
import { Obra } from "../models/obra.model";
import { UtilLogError } from "../utils/UtilLogError";
const UTIL_LOG_ERROR = new UtilLogError();

export class ObraMiddleware {

    public async validarObr_clvAccess(req: Request, res: Response, next: NextFunction) {
        try {

            let { obr_clv } = req.params;

            if (obr_clv === undefined) {
                obr_clv = req.body.obr_clv;
            }

            if (obr_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_clv",
                });
                return;
            }

            if (obr_clv.length != 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_clv debe de tener 10 digitos",
                });
                return;
            }

            const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
            if (obra.length === 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_clv proporcionado no existe dentro de la base de datos de Access",
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
                message: 'Error en la funcion validarObr_clvAccess: '+error.message
            });
        }
    }

    public async validarObr_clvSql(req: Request, res: Response, next: NextFunction) {
        try {

            let { obr_clv } = req.params;

            if (obr_clv === undefined) {
                obr_clv = req.body.obr_clv;
            }

            if (obr_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_clv",
                });
                return;
            }

            if (obr_clv.length != 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_clv debe de tener 10 digitos",
                });
                return;
            }
            // Ejecutar consulta con parámetros
            const obra = await Obra.findOne({ where: {obr_clv} });
            if (!obra) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_clv proporcionado no existe dentro de la base de datos de SQL Server",
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
                message: 'Error en la funcion validarObr_clvSql: '+error.message
            });
        }
    }

    public async validarObr_clvNoExistenteAccess(req: Request, res: Response, next: NextFunction) {
        try {

            let { obr_clv } = req.params;

            if (obr_clv === undefined) {
                obr_clv = req.body.obr_clv;
            }

            if (obr_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_clv",
                });
                return;
            }

            if (obr_clv.length != 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_clv debe de tener 10 digitos",
                });
                return;
            }

            const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
            if (obra.length != 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_clv proporcionado ya existe dentro de la base de datos de Accesss",
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
                message: 'Error en la funcion validarObr_clvNoExistenteAccess: '+error.message
             });
        }
    }

    public async validarObr_clvNoExistenteSql(req: Request, res: Response, next: NextFunction) {
        try {

            let { obr_clv } = req.params;

            if (obr_clv === undefined) {
                obr_clv = req.body.obr_clv;
            }

            if (obr_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_clv",
                });
                return;
            }

            if (obr_clv.length != 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_clv debe de tener 10 digitos",
                });
                return;
            }

            // Ejecutar consulta con parámetros
            const obra = await Obra.findOne({ where: {obr_clv} });
            if (obra) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_clv proporcionado ya existe dentro de la base de datos de SQL Server",
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
                message: 'Error en la funcion validarObr_clvNoExistenteSql: '+error.message
             });
        }
    }

    public async validarObr_call(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_call } = req.body;

            if (obr_call === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_call",
                });
                return;
            }

            if (typeof obr_call != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_call proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_call.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_call debe de ser menor a 51 caracteres",
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
                message: 'Error en la funcion validarObr_call: '+error.message
             });
        }
    }

    public async validarObr_col(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_col } = req.body;

            if (obr_col === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_col",
                });
                return;
            }

            if (typeof obr_col != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_col proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_col.length > 3) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_col debe de ser menor a 4 caracteres",
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
                message: 'Error en la funcion validarObr_col: '+error.message
             });
        }
    }

    public async validarObr_cost(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_cost } = req.body;

            if (obr_cost === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_cost",
                });
                return;
            }

            // Verifica que sea tipo número y no NaN
            if (typeof obr_cost !== "number" || isNaN(obr_cost)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_cost proporcionado debe ser de tipo numérico",
                });
                return;
            }

            if (obr_cost <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_cost deben de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarObr_cost: '+error.message
             });
        }
    }

    public async validarObr_stat(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_stat } = req.body;

            if (obr_stat === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el obr_stat",
                });
                return;
            }

            if (typeof obr_stat != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_stat proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_stat.length > 1) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_stat debe de ser 1 solo caracter",
                });
                return;
            }

            const estatus = await dbAccess.query(`SELECT * FROM status_obra WHERE sta_clv ='${obr_stat}'`);

            if (estatus == null) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_stat inexistente dentro de la bd",
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
                message: 'Error en la funcion validarObr_stat: '+error.message
             });
        }
    }

    public async validarObr_tramo(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_tramo } = req.body;

            if (obr_tramo === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_tramo",
                });
                return;
            }

            if (typeof obr_tramo != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_tramo proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_tramo.length > 70) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_tramo debe de ser menor a 71 caracteres",
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
                message: 'Error en la funcion validarObr_tramo: '+error.message
             });
        }
    }

    public async validarObr_fecha(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_fecha = new Date() } = req.body;

            // Expresión regular para validar el formato DD/MM/YYYY
            const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;

            if (!obr_fecha || !fechaRegex.test(obr_fecha)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El formato del obr_fecha debe ser DD/MM/YYYY",
                });
                return;
            }

            // Validar si la fecha es real
            const [diaStr, mesStr, anioStr] = obr_fecha.split("/");
            const dia = parseInt(diaStr, 10);
            const mes = parseInt(mesStr, 10) - 1; // En JS: enero = 0
            const anio = parseInt(anioStr, 10);

            const fecha = new Date(anio, mes, dia);

            if (
                fecha.getFullYear() !== anio ||
                fecha.getMonth() !== mes ||
                fecha.getDate() !== dia
            ) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_fecha no es una fecha válida.",
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
                message: 'Error en la funcion validarObr_fecha: '+error.message
             });
        }
    }

    public async validarObr_sis(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_sis } = req.body;

            if (obr_sis === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el obr_sis",
                });
                return;
            }

            if (typeof obr_sis != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_sis proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_sis.length > 2) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_sis debe de ser menor a 3 caracteres",
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
                message: 'Error en la funcion validarObr_sis: '+error.message
             });
        }
    }

    public async validarCol_nom(req: Request, res: Response, next: NextFunction) {
        try {

            const { col_nom } = req.body;

            if (col_nom === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el col_nom",
                });
                return;
            }

            if (typeof col_nom != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El col_nom proporcionado debe ser de tipo string",
                });
                return;
            }

            if (col_nom.length > 255) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El col_nom debe de ser menor a 256 caracteres",
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
                message: 'Error en la funcion validarCol_nom: '+error.message
             });
        }
    }

    public async validarObr_programa(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_programa } = req.body;

            if (obr_programa === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el obr_programa",
                });
                return;
            }

            if (typeof obr_programa != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_programa proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_programa.length > 3) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_programa debe de ser menor a 4 caracteres",
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
                message: 'Error en la funcion validarObr_programa: '+error.message
             });
        }
    }

    public async validarFechaInicio_Vencimiento(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_fecinip = new Date() } = req.body;
            let { obr_fecvenp = null } = req.body;

            if (obr_fecvenp == null) {
                obr_fecvenp = new Date();
                // Agregar un día a la fecha de obr_fecvenp
                obr_fecvenp.setDate(obr_fecvenp.getDate() + 1);
            }

            // Expresión regular para validar el formato DD/MM/YYYY
            const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;

            if (!obr_fecinip || !fechaRegex.test(obr_fecinip)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El formato del obr_fecinip debe ser DD/MM/YYYY",
                });
                return;
            }

            // Validar si la fecha es real
            let [diaStr, mesStr, anioStr] = obr_fecinip.split("/");
            let dia = parseInt(diaStr, 10);
            let mes = parseInt(mesStr, 10) - 1; // En JS: enero = 0
            let anio = parseInt(anioStr, 10);

            let fecha = new Date(anio, mes, dia);

            if (
                fecha.getFullYear() !== anio ||
                fecha.getMonth() !== mes ||
                fecha.getDate() !== dia
            ) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_fecinip no es una fecha válida.",
                });
                return;
            }

            if (!obr_fecvenp || !fechaRegex.test(obr_fecvenp)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El formato del obr_fecvenp debe ser DD/MM/YYYY",
                });
                return;
            }

            // Validar si la fecha es real
            [diaStr, mesStr, anioStr] = obr_fecvenp.split("/");
            dia = parseInt(diaStr, 10);
            mes = parseInt(mesStr, 10) - 1; // En JS: enero = 0
            anio = parseInt(anioStr, 10);

            fecha = new Date(anio, mes, dia);

            if (
                fecha.getFullYear() !== anio ||
                fecha.getMonth() !== mes ||
                fecha.getDate() !== dia
            ) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_fecvenp no es una fecha válida.",
                });
                return;
            }

            const [diaIni, mesIni, anioIni] = obr_fecinip.split("/").map(Number);
            const [diaVen, mesVen, anioVen] = obr_fecvenp.split("/").map(Number);

            const fechaInicio = new Date(anioIni, mesIni - 1, diaIni);
            const fechaVencimiento = new Date(anioVen, mesVen - 1, diaVen);

            // Comparar fechas
            if (fechaVencimiento <= fechaInicio) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La fecha de vencimiento debe ser mayor a la fecha de inicio.",
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
                message: 'Error en la funcion validarFechaInicio_Vencimiento: '+error.message
            });
        }
    }

    public async validarObr_npago(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_npago } = req.body;

            if (obr_npago === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_npago",
                });
                return;
            }

            if (typeof obr_npago != "number" || isNaN(obr_npago)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_npago proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (obr_npago <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_npago deben de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarObr_npago: '+error.message
             });
        }
    }

    public async validarObr_opergob(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_opergob } = req.body;

            if (obr_opergob === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_opergob",
                });
                return;
            }

            if (typeof obr_opergob != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_opergob proporcionado debe ser de tipo string",
                });
                return;
            }

            if (obr_opergob.length > 30) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_opergob debe de ser menor a 31 caracteres",
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
                message: 'Error en la funcion validarObr_opergob: '+error.message
             });
        }
    }

    public async validarObr_inc(req: Request, res: Response, next: NextFunction) {
        try {

            const { obr_inc } = req.body;

            if (obr_inc === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el obr_inc",
                });
                return;
            }

            if (typeof obr_inc != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_inc proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (obr_inc < 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El obr_inc debe de ser un numero positivo mayor o igual a 0",
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
                message: 'Error en la funcion validarObr_inc: '+error.message
             });
        }
    }

}