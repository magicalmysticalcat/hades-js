import { EphemerisDbLine } from "../ephemeris-repository/ephemerisJSON/model/EphemerisDbLine";
import { EphemerisDbLineColumnIndex } from "../ephemeris-repository/ephemerisJSON/model/EphemerisDbLineColumnIndex";

export interface IRetrogradesService {
    IsRetrograde(retrogrades:string, ingressTimes:string, planetIndex:EphemerisDbLineColumnIndex, eventTime:number):boolean;
}