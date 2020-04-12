import CelestialBody from "./CelestialBody";

export default class EphemerisLine
{
    SiderealTime : number;
    JulianDay: number;
    CelestialBodies: CelestialBody[];
    Order: number;
}