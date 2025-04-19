const moment = require('moment');
const momentZone = require('moment-timezone');

export class UtilFecha {

    DateNow() {
        var fecha = (new Date()).toLocaleString('se-SE', { timeZone: 'America/Mexico_City' }) + "Z";
        return new Date(fecha);
    }

    MomentNow() {
        var fecha = moment().format();
        return fecha
    }

    MomentZoneNow() {
        var fecha = momentZone().tz('America/Mexico_City').format();
        return fecha;
    }

    Add_Days(fecha: any, dias: number) {
        var fecha = moment(fecha).add(dias, 'days').format();
        return new Date(fecha);
    }

    // Función para convertir DD/MM/YYYY a formato SQL Server (YYYY-MM-DD)
    convertirFechaParaSQLServer(fechaString: string) {
        // Separar día, mes y año
        const partes = fechaString.split('/');
        const dia = partes[0];
        const mes = partes[1];
        const anio = partes[2];

        // Reformatear como YYYY-MM-DD HH:MM:SS
        return `${anio}-${mes}-${dia} 00:00:00.0000000`;
    }
}
