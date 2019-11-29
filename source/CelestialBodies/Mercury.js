import CelestialBody from './CelestialBody';

class Mercury extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Mercury",'C');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '5';
    }
}
export default Mercury;