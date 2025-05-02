import express from "express";
const router = express.Router();
import ObraRoutes from "../routes/obra.routes";
import CooperadorRoutes from "../routes/cooperador.routes";
import CarteraVencidaRoutes from "../routes/carteraVencida.routes";
import DBSRoutes from "../routes/dbs.routes";

export var AppRouting = [
    router.use('/obras', ObraRoutes),
    router.use('/cooperadores', CooperadorRoutes),
    router.use('/carteraVencida', CarteraVencidaRoutes),
    router.use('/dbs', DBSRoutes),
];