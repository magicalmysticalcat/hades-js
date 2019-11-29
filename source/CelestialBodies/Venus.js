import CelestialBody from './CelestialBody';

class Venus extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Venus",'D');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '6';
    }
}
export default Venus;