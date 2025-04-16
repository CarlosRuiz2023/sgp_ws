import { Router } from 'express';
const api: Router = Router();

import { ObraInterface } from '../interfaces/obra.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';
const OBRA_INTERFACE = new ObraInterface();
const AUTH_MIDDLEWARE = new AuthMiddleware();

api.get('/access', OBRA_INTERFACE.obtenerObrasAccess);
api.get('/access/:obr_clv',OBRA_INTERFACE.obtenerObraAccess);
api.post('/access',OBRA_INTERFACE.agregarObraAccess)
api.put('/access/:obr_clv',OBRA_INTERFACE.actualizarObraAccess);
api.put('/access/cambiarEstatus/:obr_clv',OBRA_INTERFACE.actualizarEstatusObraAccess);
api.put('/access/incrementarCosto/:obr_clv',OBRA_INTERFACE.actualizarCostoObraAccess);
api.delete('/access/:obr_clv',OBRA_INTERFACE.eliminarObraAccess);
api.get('/sql', OBRA_INTERFACE.obtenerObrasSql);
api.get('/sql/:obr_clv',OBRA_INTERFACE.obtenerObraSql);
api.post('/sql',OBRA_INTERFACE.agregarObraSql);
api.put('/sql/:obr_clv',OBRA_INTERFACE.actualizarObraSql);
api.put('/sql/cambiarEstatus/:obr_clv',OBRA_INTERFACE.actualizarEstatusObraSql);
api.put('/sql/incrementarCosto/:obr_clv',OBRA_INTERFACE.actualizarCostoObraSql);
api.delete('/sql/:obr_clv',OBRA_INTERFACE.eliminarObraSql);

export default api;