import * as cron from 'node-cron';
import { UtilCron } from '../utils/UtilCron';
const UTIL_CRON = new UtilCron();

export class Cron {

  /**
 * La función iniciarCron inicia la tarea taskReset.
 */
  iniciarCron = (): void => {
    this.taskUpdate_carteraVencida.start();
  };

  /**
   * La función `pausarCron` detiene una tarea llamada `taskReset`.
   */
  pausarCron = (): void => {
    this.taskUpdate_carteraVencida.stop();
  };

  // Crear un cron que se ejecute diario a la 1 am todos los dias
  // 0 1 * * *
  // */1 * * * * // Cada minuto
  taskUpdate_carteraVencida = cron.schedule('0 1 * * *', async () => {
    //await actualizarPagos();
    console.log('Paso');
    await UTIL_CRON.actualizarCarteraVencida();
  });
}