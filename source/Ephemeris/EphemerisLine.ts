import CelestialBody from "../CelestialBodies/CelestialBody";

export default class EphemerisLine
{
    SiderealTime : number;
    JulianDay: number;
    CelestialBodies: CelestialBody[];
    Order: number;
}