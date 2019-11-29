import CelestialBody from './CelestialBody';

class Moon extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Moon",'B');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '4';
    }
}
export default Moon;