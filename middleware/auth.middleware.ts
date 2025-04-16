import type { Request, Response, NextFunction } from "express";
import moment from "moment";
import { JwtService } from "../services/jwt.service";
const _JwtService = new JwtService();

export class AuthMiddleware {

    public authSimple(req: Request, res: Response, next: NextFunction) {
        try {

            if (!req.headers.authorization) {
                return res.status(403).send({ msg: 'No se ha podido autenticar con el formato correcto.' });
            }

            var token = req.headers.authorization.replace(/['"]+/g, '');
            var payload: any = {}
            payload = _JwtService.decode(token);

            if (payload.exp <= moment().unix()) {
                return res.status(404).send({ msg: 'La sesion ha sido expirada' });
            }

            next();

        } catch (error) {
            console.log(error);
            return res.status(404).send({ msg: 'Token no valido' });
        }
    }

}