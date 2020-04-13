import {ITrigonometricUtilities} from '../../trigonometric-utilities/trigonometric-utilities.interface';
import moment from 'moment';

class HouseSystem
{
    constructor(
        protected _trigonometricUtilities: ITrigonometricUtilities)
    {
    }

    protected CuspMidheaven(RA: number):number
    {
        RA = this._trigonometricUtilities.RFromD(RA);
        let E = this._trigonometricUtilities.RFromD(this._trigonometricUtilities.e);
        let MC;

        MC = this._trigonometricUtilities.RAtn(this._trigonometricUtilities.RSin(RA)/ 
                                                (this._trigonometricUtilities.RCos(RA) * 
                                                this._trigonometricUtilities.RCos(E)) );
        if (MC < 0.0)
            MC += this._trigonometricUtilities.Pi;
        if (RA > this._trigonometricUtilities.Pi)
            MC += this._trigonometricUtilities.Pi;
        return this._trigonometricUtilities.MOD( this._trigonometricUtilities.DFromR(MC));
    }

    protected CuspAscendant(RA:number,latitude:number,MC:number):number
    {
        let Asc;
        let E = this._trigonometricUtilities.RFromD(this._trigonometricUtilities.e);
        RA = this._trigonometricUtilities.RFromD(RA);
        latitude = this._trigonometricUtilities.RFromD(latitude);

        Asc = this._trigonometricUtilities.RAtn(this._trigonometricUtilities.RCos(RA) / 
                                    -(this._trigonometricUtilities.RSin(E) * this._trigonometricUtilities.RTan(latitude) + 
                                    this._trigonometricUtilities.RCos(E) * this._trigonometricUtilities.RSin(RA)));
        Asc = this._trigonometricUtilities.DFromR(Asc);

        while(!(MC<=Asc && Asc <= MC+180))
        {
            Asc = Asc+180;
            if(isNaN(Asc))
                return;
        }
        return this._trigonometricUtilities.MOD(Asc);
    }

    protected GetRAMCFromTrueSiderealDate(trueSiderealTimeOfEvent):number
    {
        let ramc = this.GetDateInDegrees(trueSiderealTimeOfEvent);
        return ramc;
    }

    protected GetRAMCFromSeconds(trueSiderealTimeInSeconds):number
    {
        return this._trigonometricUtilities.MOD(this.GetTimeSecondsToDegrees(trueSiderealTimeInSeconds) * 15);
    }

    protected GetTimeSecondsToDegrees(timeSeconds):number
    {
        return timeSeconds / 60 / 60;
    }

    protected GetDateInDegrees(dateObj:moment.Moment):number
    {
        let friendlyDate = this.GetFriendlyDate(dateObj);
        let seconds = friendlyDate.hours * 60 * 60;
        seconds += friendlyDate.minutes * 60;
        seconds += friendlyDate.seconds;
        let degrees = this.GetTimeSecondsToDegrees(seconds);        

        return degrees;
    }

    protected GetFriendlyDate(dateObj:moment.Moment)
    {
        let date = dateObj.format('DD.MM.YYYY HH:mm:ss')

        if (date) {
          let tokens = date.split(' ')
          let dmy = tokens[0].split('.')
          let hms = tokens[1].split(':')
      
          return {
            day: parseFloat(dmy[0][0]),
            month: parseFloat(dmy[0][1]),
            year: parseFloat(dmy[0][2]),
            hours: parseFloat(hms[1][0]),
            minutes: parseFloat(hms[1][1]),
            seconds: parseFloat(hms[1][2])
          };
        }
        throw new Error('Date has a format error');
    }

    public Create(eventDate:moment.Moment,latitude:number):any[]
    {
        return [];
    }
}

export default HouseSystem;