import type { Request, Response, NextFunction } from "express";
import { dbAccess } from "../config/db/connection";
import { Cooperador } from "../models/cooperador.model";
import { Obra } from "../models/obra.model";
import { UtilLogError } from "../utils/UtilLogError";

const UTIL_LOG_ERROR = new UtilLogError();

export class CooperadiresMiddleware {

    public async validarCoop_clvAccess(req: Request, res: Response, next: NextFunction) {
        try {

            let { coo_clv } = req.params;

            if (coo_clv === undefined) {
                coo_clv = req.body.coo_clv;
            }

            if (coo_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_clv",
                });
                return;
            }

            if (coo_clv.length < 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener al menos 10 digitos",
                });
                return;
            }

            if (coo_clv.length > 13) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener por mucho 13 digitos",
                });
                return;
            }

            if (coo_clv.length != 10) {
                if (coo_clv.length != 13) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "La coo_clv debe tener 10 o 13 digitos dependiendo del tipo de busqueda",
                    });
                    return;
                }
            }

            if (coo_clv.length == 10) {
                const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
                if (cooperador.length == 0) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "La coo_clv proporcionada no existe en la bd de Access",
                    });
                    return;
                }
            } else {
                const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
                if (cooperador.length == 0) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "La coo_clv proporcionada no existe en la bd de Access",
                    });
                    return;
                }
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCoop_clvAccess: '+error.message,
            });
        }
    }

    public async validarCoop_clvSql(req: Request, res: Response, next: NextFunction) {
        try {

            let { coo_clv } = req.params;

            if (coo_clv === undefined) {
                coo_clv = req.body.coo_clv;
            }

            if (coo_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_clv",
                });
                return;
            }

            if (coo_clv.length < 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener al menos 10 digitos",
                });
                return;
            }

            if (coo_clv.length > 13) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener por mucho 13 digitos",
                });
                return;
            }

            if (coo_clv.length != 10) {
                if (coo_clv.length != 13) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "La coo_clv debe tener 10 o 13 digitos dependiendo del tipo de busqueda",
                    });
                    return;
                }
            }

            if (coo_clv.length == 10) {

                const obra = await Obra.findOne({ coo_obr: coo_clv });
                // Ejecutar consulta con parámetros
                const predial = await Cooperador.findOne({ coo_clv: coo_clv });
                if (predial && obra) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "El coo_clv proporcionado no existe dentro de la base de datos de SQL Server",
                    });
                    return;
                }
            } else {
                // Ejecutar consulta con parámetros
                const predial = await Cooperador.findOne({ coo_clv: coo_clv });
                if (predial) {
                    res.status(400).json({
                        code:400,
                        success: false,
                        data: null,
                        message: "El coo_clv proporcionado no existe dentro de la base de datos de SQL Server",
                    });
                    return;
                }
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCoop_clvSql: '+error.message,
            });
        }
    }

    public async validarCoop_clvNoExistenteAccess(req: Request, res: Response, next: NextFunction) {
        try {

            let { coo_clv } = req.params;

            if (coo_clv === undefined) {
                coo_clv = req.body.coo_clv;
            }

            if (coo_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_clv",
                });
                return;
            }

            if (coo_clv.length != 13) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener 13 digitos",
                });
                return;
            }

            const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
            if (cooperador.length != 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_clv proporcionado ya existe dentro de la base de datos",
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
                message: 'Error en la funcion validarCoop_clvNoExistenteAccess: '+error.message,
            });
        }
    }

    public async validarCoop_clvNoExistenteSql(req: Request, res: Response, next: NextFunction) {
        try {

            let { coo_clv } = req.params;

            if (coo_clv === undefined) {
                coo_clv = req.body.coo_clv;
            }

            if (coo_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_clv",
                });
                return;
            }

            if (coo_clv.length != 13) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_clv debe de tener 13 digitos",
                });
                return;
            }
            // Ejecutar consulta con parámetros
            const predial = await Cooperador.findOne({ coo_clv: coo_clv });
            if (predial.recordset.length > 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_clv proporcionado ya existe dentro de la base de datos de SQL Server",
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
                message: 'Error en la funcion validarCoop_clvNoExistenteSql: '+error.message,
            });
        }
    }

    public async validarCoop_pat(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_pat } = req.body;

            if (coo_pat === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_pat",
                });
                return;
            }

            if (typeof coo_pat != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pat proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_pat.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pat debe de ser menor a 51 caracteres",
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
                message: 'Error en la funcion validarCoop_pat: '+error.message,
            });
        }
    }

    public async validarCoop_mat(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_mat } = req.body;

            if (coo_mat === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_mat",
                });
                return;
            }

            if (typeof coo_mat != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_mat proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_mat.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_mat debe de ser menor a 4 caracteres",
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
                message: 'Error en la funcion validarCoop_mat: '+error.message,
            });
        }
    }

    public async validarCoop_nom(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_nom } = req.body;

            if (coo_nom === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_nom",
                });
                return;
            }

            if (typeof coo_nom != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_nom proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_nom.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_nom debe de ser menor a 4 caracteres",
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
                message: 'Error en la funcion validarCoop_nom: '+error.message,
            });
        }
    }

    public async validarCoop_num(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_num } = req.body;

            if (coo_num === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_num",
                });
                return;
            }

            if (typeof coo_num != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_num proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_num.length > 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_num debe de ser menor a 11 caracteres",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message)
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCoop_num: '+error.message,
            });
        }
    }

    public async validarCoop_call(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_call } = req.body;

            if (coo_call === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_call",
                });
                return;
            }

            if (typeof coo_call != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_call proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_call.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_call debe de ser menor a 51 caracteres",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message)
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarCoop_call: '+error.message,
            });
        }
    }

    public async validarCoop_col(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_col } = req.body;

            if (coo_col === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la coo_col",
                });
                return;
            }

            if (typeof coo_col != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_col proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_col.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La coo_col debe de ser menor a 51 caracteres",
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
                message: 'Error en la funcion validarCoop_col: '+error.message,
            });
        }
    }

    public async validarCoop_cp(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_cp } = req.body;

            if (coo_cp === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_cp",
                });
                return;
            }

            if (typeof coo_cp != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_cp proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_cp.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_cp debe de ser menor a 51 caracteres",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success:false,
                data: null,
                message: 'Error en la funcion validarCoop_cp: '+error.message,
            });
        }
    }

    public async validarCoop_tel(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_tel } = req.body;

            if (coo_tel === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_tel",
                });
                return;
            }

            if (typeof coo_tel != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_tel proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_tel.length > 50) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_tel debe de ser menor a 51 caracteres",
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
                message: 'Error en la funcion validarCoop_tel: '+error.message,
            });
        }
    }

    public async validarCoop_npag(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_npag } = req.body;

            if (coo_npag === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_npag",
                });
                return;
            }

            if (typeof coo_npag != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_npag proporcionado debe ser de tipo numerico",
                });
                return;
            }

            if (coo_npag <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    error: "El coo_npag debe de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarCoop_npag: '+error.message,
            });
        }
    }

    public async validarCoop_venc1(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_venc1 } = req.body;

            // Expresión regular para validar el formato DD/MM/YYYY
            const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;

            if (!coo_venc1 || !fechaRegex.test(coo_venc1)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El formato del coo_venc1 debe ser DD/MM/YYYY",
                });
                return;
            }

            // Validar si la fecha es real
            const [diaStr, mesStr, anioStr] = coo_venc1.split("/");
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
                    message: "La fecha coo_venc1 no es una fecha válida.",
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
                message: 'Error en la funcion validarCoop_venc1: '+error.message,
            });
        }
    }

    public async validarCoop_mts(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_mts } = req.body;

            if (coo_mts === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar los coo_mts",
                });
                return;
            }

            // Verifica que sea tipo número y no NaN
            if (typeof coo_mts !== "number" || isNaN(coo_mts)) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Los coo_mts proporcionado debe ser de tipo numérico",
                });
                return;
            }

            if (coo_mts <= 0) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Los coo_mts deben de ser un numero positivo mayor a 0",
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
                message: 'Error en la funcion validarCoop_mts: '+error.message,
            });
        }
    }

    public async validarCoop_predSql(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_pred } = req.body;

            if (coo_pred === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_pred",
                });
                return;
            }

            if (typeof coo_pred != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_pred.length > 12) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred debe de ser menor a 13 caracteres",
                });
                return;
            }
            const cooperadorExistente = await Cooperador.findOne({ coo_pred });
            if (cooperadorExistente) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred ya se encurentra registrado en BD",
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
                message: 'Error en la funcion validarCoop_predSql: '+error.message,
            });
        }
    }

    public async validarCoop_predAccess(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_pred } = req.body;

            if (coo_pred === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_pred",
                });
                return;
            }

            if (typeof coo_pred != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_pred.length > 12) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred debe de ser menor a 13 caracteres",
                });
                return;
            }
            const cooperadorExistente = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_pred = '${coo_pred}'`);
            if (cooperadorExistente) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred ya se encurentra registrado en BD",
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
                message: 'Error en la funcion validarCoop_predAccess: '+error.message,
            });
        }
    }
    public async validarCoop_pred(req: Request, res: Response, next: NextFunction) {
        try {

            const { coo_pred } = req.body;

            if (coo_pred === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el coo_pred",
                });
                return;
            }

            if (typeof coo_pred != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred proporcionado debe ser de tipo string",
                });
                return;
            }

            if (coo_pred.length > 12) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El coo_pred debe de ser menor a 13 caracteres",
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
                message: 'Error en la funcion validarCoop_pred: '+error.message,
            });
        }
    }

}