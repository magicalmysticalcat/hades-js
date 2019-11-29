import CelestialBody from './CelestialBody';

class Jupiter extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Jupiter",'F');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '8';
    }
}
export default Jupiter;