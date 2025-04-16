import { Router } from 'express';
const api: Router = Router();

import { CarteraVencidaInterface } from '../interfaces/carteraVencida.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';
const CARTERA_VENCIDA_INTERFACE = new CarteraVencidaInterface();
const AUTH_MIDDLEWARE = new AuthMiddleware();

api.put('/', CARTERA_VENCIDA_INTERFACE.actualizarCarteraVencidaSql);

export default api;