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
}
