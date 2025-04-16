import { ApiLogsService } from "../services/api_logs.service";
const _ApiLogService = new ApiLogsService();

export class ObraController {
  public async test(data: any) {
    let claveDebug = "OBRA_CONTROLLER.TEST";
    return {
      environment: global.ENVGLOBAL.API.ENVIRONMENT, //Obtener ambiente global
      app: global.ENVGLOBAL.API.NAME,
      version: global.ENVGLOBAL.API.VERSION,
      method: "/v1/demo/test",
      msg: 'Hola llegaste a la ruta test, Saludos!',
      code: 200,
      params: data
    };
  }

  public async LOG_REGISTER_INFORMATIVO(data:any) {
    let claveDebug = "OBRA_CONTROLLER.LOG_REGISTER_INFORMATIVO";
    try {
      // EJEMPLO PARA VER LOG EN TERMINAL REMOTA
      await _ApiLogService.showLog(claveDebug, { app: global.ENVGLOBAL.API.NAME, accion: "Ejecutando metodo de prueba para api de logs", url_dev:"logsdev.leon.gob.mx", url_qa:"logsqa.leon.gob.mx",url_prod:"appmonitor.leon.gob.mx"})

      // EJEMPLO DE REGISTRO DE LOG INFORMATIVO
      // los unicos campos requeridos son la ubicacion y el mensaje, los demas son parametros que tu quieras mandar
      let json_info = {
        ubicacion: claveDebug,
        mensaje: "Log informativo de prueba",
        app: global.ENVGLOBAL.API.NAME,
        usuario: { user: "jose.vaqueiro", email: "jose.vaqueiro@leon.gob.mx" },
        code: 200
      }
      let data = await _ApiLogService.registrar_log_informativo(json_info);
      return data; // este return es informativo para el endpoint, en un ambiente real unicamente se ejecuta el metodo de registro y continuan los procesos

    } catch (error: any) {
      // para probar este bloque comentar el json del try o definir algunar variable que no exista
      let json_error = {
        ubicacion: claveDebug,
        mensaje: "Log informativo de prueba",
        usuario: { user: "jose.vaqueiro", email: "jose.vaqueiro@leon.gob.mx" },
        code: 500,
        error_msg: error.toString(),
        error_code: await _ApiLogService.error_toString(error)
      }
      // EJEMPLO DE REGISTRO DE LOG ERROR
      await _ApiLogService.registrar_log_error(json_error);
      
      return {
        "msg": "Log registrado correctamente en catch",
        "code": 200,
        "action": "Api_Logs_Service.registrar_log",
        "ubicacion": claveDebug,
      }; // este return es informativo para el endpoint, en un ambiente real unicamente se ejecuta el metodo de registro y continuan los procesos
    }
  }

}