import CelestialBody from './CelestialBody';

class Saturn extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Saturn",'G');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '9';
    }
}
export default Saturn;