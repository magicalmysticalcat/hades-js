import A from 'meeusjs';

class TimeConversions
{
    GetTrueSiderealTimeInSeconds(utcDateObj, longitude)
    {
        let jdo = new A.JulianDay(new Date(utcDateObj.format()));
        let apparentSiderealTimeInSeconds = A.Sidereal.apparent(jdo);
        let longitudeInTimeValue = this.ConvertDegreesToTimeSeconds(longitude);
        let result = apparentSiderealTimeInSeconds+longitudeInTimeValue;
        return result;  
    }

    ConvertDegreesToTimeSeconds(degrees)
    {
        let hoursInDecimal = degrees/15;
        let seconds = hoursInDecimal*60*60;
        return seconds;
    }

    ConvertDecimalDegreesToHMS(degrees)
    {
        degrees = degrees * 60 * 60;
        let hours = Math.floor((degrees / (60 * 60)));
        degrees = degrees - (hours * 60 * 60);
        let minutes = Math.floor((degrees / 60));
        degrees = degrees - (minutes * 60);
        let seconds = Math.round(degrees);
        if(hours < 10)
        {
            hours = "0" + hours;
        }
        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }
        if(seconds < 10)
        {
            seconds = "0" + seconds;
        }
        return {hours:hours,minutes:minutes,seconds:seconds};
    }
}
export default TimeConversions;