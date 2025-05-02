import { Router } from 'express';
const api: Router = Router();

import { ObraInterface } from '../interfaces/obra.interface';
import { ObraMiddleware } from '../middleware/obra.middleware';
import { FiltroMiddleware } from '../middleware/filtro.middleware';
const OBRA_INTERFACE = new ObraInterface();
const OBRA_MIDDLEWARE = new ObraMiddleware();
const FILTRO_MIDDLEWARE = new FiltroMiddleware();

api.post('/access', FILTRO_MIDDLEWARE.validarLimit, FILTRO_MIDDLEWARE.validarPage, FILTRO_MIDDLEWARE.validarFiltro, OBRA_INTERFACE.obtenerObrasAccess);
api.get('/access/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvAccess, OBRA_INTERFACE.obtenerObraAccess);
api.post('/access/agregar', OBRA_MIDDLEWARE.validarObr_clvNoExistenteAccess, OBRA_MIDDLEWARE.validarObr_call, OBRA_MIDDLEWARE.validarObr_col, OBRA_MIDDLEWARE.validarObr_cost, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_tramo, OBRA_MIDDLEWARE.validarObr_fecha, OBRA_MIDDLEWARE.validarObr_sis, OBRA_MIDDLEWARE.validarCol_nom, OBRA_MIDDLEWARE.validarObr_programa, OBRA_MIDDLEWARE.validarFechaInicio_Vencimiento, OBRA_MIDDLEWARE.validarObr_npago, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.agregarObraAccess)
api.put('/access/actualizar/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvAccess, OBRA_MIDDLEWARE.validarObr_call, OBRA_MIDDLEWARE.validarObr_col, OBRA_MIDDLEWARE.validarObr_cost, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_tramo, OBRA_MIDDLEWARE.validarObr_fecha, OBRA_MIDDLEWARE.validarObr_sis, OBRA_MIDDLEWARE.validarCol_nom, OBRA_MIDDLEWARE.validarObr_programa, OBRA_MIDDLEWARE.validarFechaInicio_Vencimiento, OBRA_MIDDLEWARE.validarObr_npago, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.actualizarObraAccess);
api.put('/access/cambiarEstatus/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvAccess, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.actualizarEstatusObraAccess);
api.put('/access/incrementarCosto/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvAccess, OBRA_MIDDLEWARE.validarObr_inc, OBRA_INTERFACE.actualizarCostoObraAccess);
api.delete('/access/eliminar/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvAccess, OBRA_INTERFACE.eliminarObraAccess);
api.post('/sql', FILTRO_MIDDLEWARE.validarLimit, FILTRO_MIDDLEWARE.validarPage, FILTRO_MIDDLEWARE.validarFiltro, OBRA_INTERFACE.obtenerObrasSql);
api.get('/sql/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvSql, OBRA_INTERFACE.obtenerObraSql);
api.post('/sql/agregar', OBRA_MIDDLEWARE.validarObr_clvNoExistenteSql, OBRA_MIDDLEWARE.validarObr_call, OBRA_MIDDLEWARE.validarObr_col, OBRA_MIDDLEWARE.validarObr_cost, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_tramo, OBRA_MIDDLEWARE.validarObr_fecha, OBRA_MIDDLEWARE.validarObr_sis, OBRA_MIDDLEWARE.validarCol_nom, OBRA_MIDDLEWARE.validarObr_programa, OBRA_MIDDLEWARE.validarFechaInicio_Vencimiento, OBRA_MIDDLEWARE.validarObr_npago, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.agregarObraSql);
api.put('/sql/actualizar/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvSql, OBRA_MIDDLEWARE.validarObr_call, OBRA_MIDDLEWARE.validarObr_col, OBRA_MIDDLEWARE.validarObr_cost, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_tramo, OBRA_MIDDLEWARE.validarObr_fecha, OBRA_MIDDLEWARE.validarObr_sis, OBRA_MIDDLEWARE.validarCol_nom, OBRA_MIDDLEWARE.validarObr_programa, OBRA_MIDDLEWARE.validarFechaInicio_Vencimiento, OBRA_MIDDLEWARE.validarObr_npago, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.actualizarObraSql);
api.put('/sql/cambiarEstatus/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvSql, OBRA_MIDDLEWARE.validarObr_stat, OBRA_MIDDLEWARE.validarObr_opergob, OBRA_INTERFACE.actualizarEstatusObraSql);
api.put('/sql/incrementarCosto/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvSql, OBRA_MIDDLEWARE.validarObr_inc, OBRA_INTERFACE.actualizarCostoObraSql);
api.delete('/sql/eliminar/:obr_clv', OBRA_MIDDLEWARE.validarObr_clvSql, OBRA_INTERFACE.eliminarObraSql);

export default api;