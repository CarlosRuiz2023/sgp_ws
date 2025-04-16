import express from "express";
const router = express.Router();
import DemoRoutes from "../routes/demo.routes";

export var AppRouting = [ 
    router.use('/demo', DemoRoutes),
]