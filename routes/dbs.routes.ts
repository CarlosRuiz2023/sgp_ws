import { Router } from 'express';
const api: Router = Router();

import { DBsInterface } from '../interfaces/dbs.interface';
const DBS_INTERFACE = new DBsInterface();

api.get('/actualizar-Acceess-PostgreSQL', DBS_INTERFACE.actualizarAccessPostgreSQL);
api.get('/actualizar-SQLServer',DBS_INTERFACE.actualizarSQLServer);

export default api;