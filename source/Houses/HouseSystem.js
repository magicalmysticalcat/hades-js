import MathCalcs from '../MathCalcs.js';

class HouseSystem
{
    constructor()
    {
        this.MathCalcs = new MathCalcs();
    }

    CuspMidheaven(RA)
    {
        RA = this.MathCalcs.RFromD(RA);
        let E = this.MathCalcs.RFromD(this.MathCalcs.e);
        let MC;

        MC = this.MathCalcs.RAtn(this.MathCalcs.RSin(RA)/ (this.MathCalcs.RCos(RA) * this.MathCalcs.RCos(E)) );
        if (MC < 0.0)
            MC += this.MathCalcs.rPi;
        if (RA > this.MathCalcs.rPi)
            MC += this.MathCalcs.rPi;
        return this.MathCalcs.MOD( this.MathCalcs.DFromR(MC));
    }

    CuspAscendant(RA,latitude,MC)
    {
        let Asc;
        let E = this.MathCalcs.RFromD(this.MathCalcs.e);
        RA = this.MathCalcs.RFromD(RA);
        latitude = this.MathCalcs.RFromD(latitude);

        Asc = this.MathCalcs.RAtn(this.MathCalcs.RCos(RA) / -(this.MathCalcs.RSin(E) * this.MathCalcs.RTan(latitude) + this.MathCalcs.RCos(E) * this.MathCalcs.RSin(RA)));
        Asc = this.MathCalcs.DFromR(Asc);

        while(!(MC<=Asc && Asc <= MC+180))
        {
            Asc = Asc+180;
            if(isNaN(Asc))
                return;
        }
        return this.MathCalcs.MOD(Asc);
    }

    GetRAMCFromTrueSiderealDate(trueSiderealTimeOfEvent)
    {
        let ramc = this.GetDateInDegrees(trueSiderealTimeOfEvent);
        return ramc;
    }

    GetRAMCFromSeconds(trueSiderealTimeInSeconds)
    {
        return this.MathCalcs.MOD(this.GetTimeSecondsToDegrees(trueSiderealTimeInSeconds) * 15);
    }

    GetTimeSecondsToDegrees(timeSeconds)
    {
        return timeSeconds / 60 / 60;
    }

    GetDateInDegrees(dateObj)
    {
        let friendlyDate = this.GetFriendlyDate(dateObj);
        let seconds = friendlyDate.hours * 60 * 60;
        seconds += friendlyDate.minutes * 60;
        seconds += friendlyDate.seconds;
        let degrees = this.GetTimeSecondsToDegrees(seconds);        

        return degrees;
    }

    GetFriendlyDate(dateObj)
    {
        let date = dateObj.format('DD.MM.YYYY HH:mm:ss')

        if (date) {
          var tokens = date.split(' ')
      
          tokens[0] = tokens[0].split('.')
          tokens[1] = tokens[1].split(':')
      
          date = {
            day: parseFloat(tokens[0][0]), // parseFloat strips leading zeros
            month: parseFloat(tokens[0][1]),
            year: parseFloat(tokens[0][2]),
            hours: parseFloat(tokens[1][0]),
            minutes: parseFloat(tokens[1][1]),
            seconds: parseFloat(tokens[1][2])
          }
          return date;
        }
        return null;
    }

    Create()
    {
        return [];
    }
}

export default HouseSystem;