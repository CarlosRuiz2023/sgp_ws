import { CarteraVencida } from "../models/carteraVencida.model";
import { UtilQuerys } from "../utils/UtilQuerys";

const _UtilQuerys = new UtilQuerys();

export class CarteraVencidaController {
  public async obtenerCarteraVencida(data: any) {
    const params = await data;
    const { cta_predial } = params;
    const cartera_vencida = await CarteraVencida.findOne({ where: { cta_predial } });
    if (!_UtilQuerys.validarRespuestaFindOneSQLServer(cartera_vencida)) return "Respuesta de BD invalida";
    return cartera_vencida;
  }
  public async actualizarCarteraVencidaSql(data: any) {
    const params = await data;
    const { saldosin, saldocon, incremento, cta_predial } = params;
    const cartera_vencida = await CarteraVencida.update({
      SALDOSIN: parseFloat(saldosin) + parseFloat(incremento),
      SALDOCON: parseFloat(saldocon) + parseFloat(incremento),
      INCREMENTO_OBRA: parseFloat(incremento),
      COO_INC: parseFloat(incremento),
    }, {
      where: {
        CTA_PREDIAL: cta_predial,
      },
    });
    if (!_UtilQuerys.validarRespuestaUpdateSQLServer(cartera_vencida)) return "Respuesta de BD invalida";
    const carteraVencidaRecuperada = await CarteraVencida.findOne({ where: { cta_predial } });
    return carteraVencidaRecuperada;
  }
}