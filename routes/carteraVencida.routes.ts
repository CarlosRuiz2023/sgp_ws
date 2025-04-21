import { Router } from 'express';
const api: Router = Router();

import { CarteraVencidaInterface } from '../interfaces/carteraVencida.interface';
import { CarteraVencidaMiddleware } from '../middleware/carteraVencida.middleware';
const CARTERA_VENCIDA_INTERFACE = new CarteraVencidaInterface();
const CATRERA_VENNCIDA_MIDDLEWARE = new CarteraVencidaMiddleware();

api.get('/:cta_predial', CATRERA_VENNCIDA_MIDDLEWARE.validarCV_pred,CARTERA_VENCIDA_INTERFACE.obtenerCarteraVencidaSql);
api.put('/', CATRERA_VENNCIDA_MIDDLEWARE.validarCV_saldosin,CATRERA_VENNCIDA_MIDDLEWARE.validarCV_saldocon,CATRERA_VENNCIDA_MIDDLEWARE.validarCV_incremento,CATRERA_VENNCIDA_MIDDLEWARE.validarCV_pred,CARTERA_VENCIDA_INTERFACE.actualizarCarteraVencidaSql);

export default api;