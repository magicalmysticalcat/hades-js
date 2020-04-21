import { IRetrogradesService } from "./retrogrades-service.interface";
import { EphemerisDbLine } from "../ephemeris-repository/ephemerisJSON/model/EphemerisDbLine";
import { EphemerisDbLineColumnIndex } from "../ephemeris-repository/ephemerisJSON/model/EphemerisDbLineColumnIndex";

export class RetrogradesService implements IRetrogradesService{
    IsRetrograde(retrogrades:string, ingressTimes:string, planetIndex:number, eventTime: number): boolean {
        planetIndex-=3;
        let start = planetIndex*2;
        let end = start+2;
        let substring = retrogrades.substring(start,end);
        
        let isRetrograde = substring === 'xx';
        if(isRetrograde)
        {
            let time = ingressTimes.substring(start,end);
            if(time!=='--')
            {
                isRetrograde = parseInt(time) <= eventTime;
            }
        }
        return isRetrograde;
    }
    
}