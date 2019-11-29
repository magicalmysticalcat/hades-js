import CelestialBody from './CelestialBody';

class Sun extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Sun",'A');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '3';
    }
}
export default Sun;