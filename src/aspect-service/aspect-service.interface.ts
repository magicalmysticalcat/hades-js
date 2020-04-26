import {CelestialBody} from "../models/CelestialBody";

export interface IAspectService {
    CalculateAspects(celestialBodies : CelestialBody[]) : any[];
    IsAspected(distance:number, 
        celestialBody:CelestialBody, 
        aspectName:string,
        aspectValue:number):boolean;
}