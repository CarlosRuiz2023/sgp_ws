import { Router } from 'express';
import { CooperadorInterface } from '../interfaces/cooperador.interface';
import { CooperadiresMiddleware } from '../middleware/cooperador.middleware';

const api: Router = Router();
const COOPERADOR_INTERFACE = new CooperadorInterface();
const COOPERADOR_MIDDLEWARE = new CooperadiresMiddleware();

api.get('/access/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvAccess, COOPERADOR_INTERFACE.obtenerCooperadorAccess);
api.post('/access/agregar', COOPERADOR_MIDDLEWARE.validarCoop_clvNoExistenteAccess, COOPERADOR_MIDDLEWARE.validarCoop_pat, COOPERADOR_MIDDLEWARE.validarCoop_mat, COOPERADOR_MIDDLEWARE.validarCoop_nom, COOPERADOR_MIDDLEWARE.validarCoop_num, COOPERADOR_MIDDLEWARE.validarCoop_call, COOPERADOR_MIDDLEWARE.validarCoop_col, COOPERADOR_MIDDLEWARE.validarCoop_cp, COOPERADOR_MIDDLEWARE.validarCoop_tel, COOPERADOR_MIDDLEWARE.validarCoop_npag, COOPERADOR_MIDDLEWARE.validarCoop_venc1, COOPERADOR_MIDDLEWARE.validarCoop_mts, COOPERADOR_MIDDLEWARE.validarCoop_predAccess, COOPERADOR_INTERFACE.agregarCooperadorAccess)
api.put('/access/actualizar/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvAccess, COOPERADOR_MIDDLEWARE.validarCoop_pat, COOPERADOR_MIDDLEWARE.validarCoop_mat, COOPERADOR_MIDDLEWARE.validarCoop_nom, COOPERADOR_MIDDLEWARE.validarCoop_num, COOPERADOR_MIDDLEWARE.validarCoop_call, COOPERADOR_MIDDLEWARE.validarCoop_col, COOPERADOR_MIDDLEWARE.validarCoop_cp, COOPERADOR_MIDDLEWARE.validarCoop_tel, COOPERADOR_MIDDLEWARE.validarCoop_npag, COOPERADOR_MIDDLEWARE.validarCoop_venc1, COOPERADOR_MIDDLEWARE.validarCoop_mts, COOPERADOR_MIDDLEWARE.validarCoop_pred, COOPERADOR_INTERFACE.actualizarCooperadorAccess);
api.delete('/access/eliminar/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvAccess, COOPERADOR_INTERFACE.eliminarCooperadorAccess);
api.get('/sql/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvSql, COOPERADOR_INTERFACE.obtenerCooperadorSql);
api.post('/sql/agregar', COOPERADOR_MIDDLEWARE.validarCoop_clvNoExistenteSql, COOPERADOR_MIDDLEWARE.validarCoop_pat, COOPERADOR_MIDDLEWARE.validarCoop_mat, COOPERADOR_MIDDLEWARE.validarCoop_nom, COOPERADOR_MIDDLEWARE.validarCoop_num, COOPERADOR_MIDDLEWARE.validarCoop_call, COOPERADOR_MIDDLEWARE.validarCoop_col, COOPERADOR_MIDDLEWARE.validarCoop_cp, COOPERADOR_MIDDLEWARE.validarCoop_tel, COOPERADOR_MIDDLEWARE.validarCoop_npag, COOPERADOR_MIDDLEWARE.validarCoop_venc1, COOPERADOR_MIDDLEWARE.validarCoop_mts, COOPERADOR_MIDDLEWARE.validarCoop_predSql, COOPERADOR_INTERFACE.agregarCooperadorSql);
api.put('/sql/actualizar/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvSql, COOPERADOR_MIDDLEWARE.validarCoop_pat, COOPERADOR_MIDDLEWARE.validarCoop_mat, COOPERADOR_MIDDLEWARE.validarCoop_nom, COOPERADOR_MIDDLEWARE.validarCoop_num, COOPERADOR_MIDDLEWARE.validarCoop_call, COOPERADOR_MIDDLEWARE.validarCoop_col, COOPERADOR_MIDDLEWARE.validarCoop_cp, COOPERADOR_MIDDLEWARE.validarCoop_tel, COOPERADOR_MIDDLEWARE.validarCoop_npag, COOPERADOR_MIDDLEWARE.validarCoop_venc1, COOPERADOR_MIDDLEWARE.validarCoop_mts, COOPERADOR_MIDDLEWARE.validarCoop_pred, COOPERADOR_INTERFACE.actualizarCooperadorSql);
api.delete('/sql/eliminar/:coo_clv', COOPERADOR_MIDDLEWARE.validarCoop_clvSql, COOPERADOR_INTERFACE.eliminarCooperadorSql);

export default api;