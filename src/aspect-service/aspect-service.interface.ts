import CelestialBody from "../models/CelestialBody";

export interface IAspectService {
    CalculateAspects(celestialBodies : CelestialBody[]) : any[];
}