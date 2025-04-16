import { Router } from 'express';
const api: Router = Router();

import { CooperadorInterface } from '../interfaces/cooperador.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';
const COOPERADOR_INTERFACE = new CooperadorInterface();
const AUTH_MIDDLEWARE = new AuthMiddleware();

api.get('/access/:coo_clv',COOPERADOR_INTERFACE.obtenerCooperadorAccess);
api.post('/access',COOPERADOR_INTERFACE.agregarCooperadorAccess)
api.put('/access/:coo_clv',COOPERADOR_INTERFACE.actualizarCooperadorAccess);
api.delete('/access/:coo_clv',COOPERADOR_INTERFACE.eliminarCooperadorAccess);
api.get('/sql/:coo_clv',COOPERADOR_INTERFACE.obtenerCooperadorSql);
api.post('/sql',COOPERADOR_INTERFACE.agregarCooperadorSql);
api.put('/sql/:coo_clv',COOPERADOR_INTERFACE.actualizarCooperadorSql);
api.delete('/sql/:coo_clv',COOPERADOR_INTERFACE.eliminarCooperadorSql);

export default api;