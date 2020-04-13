import A from 'meeusjs';
import moment from 'moment';
import { ITimeConversions } from './time-conversions.interface';

export class TimeConversions implements ITimeConversions
{
    public GetTrueSiderealTimeInSeconds(utcDateObj:moment.Moment, longitude:number)
    {
        let jdo = new A.JulianDay(new Date(utcDateObj.format()));
        let apparentSiderealTimeInSeconds = A.Sidereal.apparent(jdo);
        let longitudeInTimeValue = this.ConvertDegreesToTimeSeconds(longitude);
        let result = apparentSiderealTimeInSeconds+longitudeInTimeValue;
        return result;  
    }

    public ConvertDegreesToTimeSeconds(degrees:number)
    {
        let hoursInDecimal = degrees/15;
        let seconds = hoursInDecimal*60*60;
        return seconds;
    }

    public ConvertDecimalDegreesToHMS(degrees:number)
    {
        degrees = degrees * 60 * 60;
        let hours = Math.floor((degrees / (60 * 60)));
        degrees = degrees - (hours * 60 * 60);
        let minutes = Math.floor((degrees / 60));
        degrees = degrees - (minutes * 60);
        let seconds = Math.round(degrees);
        let stringifiedHours = hours.toString();
        let stringifiedMinutes = minutes.toString();
        let stringifiedSeconds = seconds.toString();
        if(hours < 10)
        {
            stringifiedHours = "0" + stringifiedHours;
        }
        if(minutes < 10)
        {
            stringifiedMinutes = "0" + stringifiedMinutes;
        }
        if(seconds < 10)
        {
            stringifiedSeconds = "0" + stringifiedSeconds;
        }
        return {hours:stringifiedHours,
                minutes:stringifiedMinutes,
                seconds:stringifiedSeconds};
    }
}