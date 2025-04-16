import { Router } from 'express';
const api: Router = Router();

import { DemoInterface } from '../interfaces/demo.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';
const DEMO_INTERFACE = new DemoInterface();
const AUTH_MIDDLEWARE = new AuthMiddleware();

api.get('/test', DEMO_INTERFACE.test);
// RUTA PROTEGIDA
//api.get('/test', AUTH_MIDDLEWARE.authSimple, DEMO_INTERFACE.test);

// RUTA EJEMPLO PARA GUARDAR LOG
api.get('/log', DEMO_INTERFACE.registrar_logs);

export default api;