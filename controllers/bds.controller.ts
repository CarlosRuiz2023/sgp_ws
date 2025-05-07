import { dbAccess, dbPostgres } from "../config/db/connection";
import { Obra } from "../models/obra.model";
import { ObraPostgreSQL } from "../models/obraPostgreSQL.model";
import { UtilQuerys } from "../utils/UtilQuerys";
import { ObraController } from "./obra.controller";
import { UtilFecha } from "../utils/UtilFecha";
import { CooperadorPostgreSQL } from "../models/cooperadorPostgreSQL.model";
import { FrentePostgreSQL } from "../models/frentePostgreSQL.model";
import { MovtosFinancPostgreSQL } from "../models/movtosFinancPostgreSQL.model";
import { PredioPostgreSQL } from "../models/prediosPostgreSQL.model";
import { ObraGeoPostgreSQL } from "../models/obraGeoPostgreSQL.model";

const _UtilFecha = new UtilFecha();
const _UtilQuerys = new UtilQuerys();
const _ObraController = new ObraController();

export class DBsController {
  public async actualizarBDSPostgreSQLAccess() {
    const obrasAccess = await dbAccess.query(`select * from obra;`);
    //if(_UtilQuerys.validarRespuestaFindAccess(obrasAccess)) return "Respuesta de BD invalida";
    const obrasPostgreSQL = await ObraPostgreSQL.findAll();
    //if(_UtilQuerys.validarRespuestaFindAllSQLServer(obrasPostgreSQL)) return "Respuesta de BD invalida";

    //comparar ambas respuestas y obtener obras faltantes para ambas BDs
    const clavesPostgreSQL = obrasPostgreSQL.map((obra: any) => obra.obr_clv);
    const clavesAccess = obrasAccess.map((obra: any) => obra.obr_clv);
    const obrasFaltantesPostgreSQL = obrasAccess.filter((obra: any) => !clavesPostgreSQL.includes(obra.obr_clv));
    const obrasFaltantesAccess = obrasPostgreSQL.filter((obra: any) => !clavesAccess.includes(obra.obr_clv));

    /* for (const obra of obrasFaltantesAccess) {
      if (obra) {
        const { obr_clv, oid, obr_cost, obr_status, obr_fecha, obr_sis, obr_prog2, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = obra;
        const geo = await ObraGeoPostgreSQL.findOne({ where: { oid } });
        const { calle, colonia, tramo } = geo;
        const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${calle}','0',${obr_cost},'${obr_status}','${tramo.substring(0,70)}','${obr_fecha}','${obr_sis}','${colonia}','${obr_prog2}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
        try {
          await dbAccess.query(query);
        } catch (error) { }
        console.log(`Se inserto la obra ${obr_clv} en la BD Access`);
        const frentes = await FrentePostgreSQL.findAll({ where: { obra_sifidoc: obr_clv } });
        for (const frente of frentes) {
          const { obra_sifidoc, coopid, mts_frente,cid,pid } = frente;
          if (frente) {
            const cooperador = await CooperadorPostgreSQL.findOne({ where: { midcoop: cid } });
            if (cooperador) {
              const predio = await PredioPostgreSQL.findOne({ where: { pid } });
              if (predio) {
                const { mapellidop, mapellidom, mnombres, mcallecoop, mcolcoop, mtelcoop } = cooperador;
                const { ctapredial, nooficial } = predio;
                const query = `INSERT INTO cooperador (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
                VALUES('${obra_sifidoc + coopid}','${mapellidop}','${mapellidom}','${mnombres}','${nooficial == null ? '0' : nooficial}','${mcallecoop}','','${mcolcoop}','LEON DE LOS ALDAMA','GUA','${mtelcoop}','1',0.0,${obr_npago},'${obr_fecvenp}','${obr_clv}',${mts_frente},0.0,'${coopid}','${ctapredial}','${mapellidop + " " + mapellidom + " " + mnombres}',0.0,0.0,0.0,0.0,'01/01/1900','01/01/1900','01/01/1900','01/01/1900',False,'0','0','0','0','01/01/1900',0,False)`;
                try {
                  await dbAccess.query(query);
                } catch (error) { }
                console.log(`Se inserto el cooperador ${obra_sifidoc + coopid} en la BD PostgreSQL`);
              }
            }
          }
        }
      }
    } */

    for (const obra of obrasFaltantesPostgreSQL) {
      if (obra) {
        const { obr_clv, obr_cost, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = obra;
        let { obr_stat } = obra;
        if (obr_stat = 'C') {
          obr_stat = 11;
        } else if (obr_stat = 'B') {
          obr_stat = 10;
        }
        await ObraPostgreSQL.create({
          obr_clv,
          obr_cost,
          obr_status: obr_stat,
          obr_int: 2,
          obr_fecha: obr_fecha,
          obr_sis,
          obr_digito: 0,
          obr_prog2: obr_programa,
          obr_fecinip,
          obr_fecvenp,
          obr_npago,
          obr_opergob,
          obr_clv_int: Number(obr_clv),
          oid: 0
        });
        console.log(`Se inserto la obra ${obr_clv} en la BD PostgreSQL`);
        const cooperadores = await dbAccess.query(`select * from cooperador where coo_obr = '${obra.obr_clv}';`);
        for (const cooperador of cooperadores) {
          if (cooperador) {
            const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_mts, coo_pred } = cooperador;
            const sequencia_cooperadores: any = await dbPostgres.query(`SELECT MAX(midcoop) FROM public2.mcoop;`);
            const midcoop = sequencia_cooperadores[0][0].max + 1;
            await CooperadorPostgreSQL.create({
              midcoop,
              mapellidop: coo_pat,
              mapellidom: coo_mat,
              mnombres: coo_nom,
              mcallecoop: coo_call,
              mcolcoop: coo_col,
              mcp: coo_cp,
              mnooficial_ext: coo_nof,
              mtelcoop: coo_tel,
              mnomficha: coo_pat + " " + coo_mat + " " + coo_nom,
              mestado: 'GUANAJUATO',
              mpais: 'MEXICO',
              mrelacionpredio: coo_pred != null ? 1 : 0
            });
            const sequencia_frentes: any = await dbPostgres.query(`SELECT MAX(fid) FROM public2.frentes;`);
            const fid = sequencia_frentes[0][0].max + 1;
            await FrentePostgreSQL.create({
              fid,
              mts_frente: coo_mts,
              coopid: coo_clv.substring(coo_clv.length - 3),
              pid: midcoop,
              obra_sifidoc: coo_clv.substring(0, coo_clv.length - 3),
              feccre: new Date(),
              usucre: 'admin',
              obr_clv_int: coo_clv.substring(0, coo_clv.length - 3),
            });
            const movimientos = await dbAccess.query(`select * from movimientos where mov_clv1 = '${coo_clv}';`);
            for (const movimiento of movimientos) {
              if (movimiento) {
                const sequencia_movimientos = await dbAccess.query(`select max(id_mov) from movimientos;`);
                const { mov_fecha, mov_cap, mov_ndep } = movimiento;
                let { id_mov } = sequencia_movimientos;
                id_mov++;
                await MovtosFinancPostgreSQL.create({
                  mov_obra_sifidoc: coo_clv.substring(0, coo_clv.length - 3),
                  mov_coop_sifidoc: coo_clv.substring(coo_clv.length - 3),
                  fec_mov_as400: mov_fecha,
                  usu_sifidoc: 'admin',
                  monto_abono_sifidoc: mov_cap,
                  tipo_mov_sifidoc: 1,
                  fec_aplic_mov: new Date(),
                  clave_sifidoc: coo_clv,
                  fid,
                  usucre: 'admin',
                  monto_mov: mov_cap,
                  id_mov: id_mov,
                  folio_cajas: mov_ndep,
                  tipo_mov: 1,
                  cactivo: 1
                });
              }
            }
            console.log(`Se inserto el cooperador ${coo_clv} en la BD PostgreSQL`);
          }
        }
      }
    }
    //if(_UtilQuerys.validarRespuestaFindAllSQLServer(obrasPostgreSQL)) return "Respuesta de BD invalida";

    return "BD de Access y BD de PostgreSQL actualizadas correctamente"
  }
}