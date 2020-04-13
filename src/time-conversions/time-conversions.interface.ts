import moment from "moment";

export interface ITimeConversions {
    GetTrueSiderealTimeInSeconds(utcDateObj:moment.Moment, longitude:number);
    ConvertDegreesToTimeSeconds(degrees:number);
    ConvertDecimalDegreesToHMS(degrees:number);
    
}