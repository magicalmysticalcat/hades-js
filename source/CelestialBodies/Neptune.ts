import CelestialBody from './CelestialBody';

class Neptune extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Neptune",'I');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '11';
    }
}
export default Neptune;