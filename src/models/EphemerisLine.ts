import {CelestialBody} from "./CelestialBody";

export class EphemerisLine
{
    SiderealTime : number;
    JulianDay: number;
    CelestialBodies: CelestialBody[];
    Order: number;
}