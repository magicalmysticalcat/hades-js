import CelestialBody from './CelestialBody';

class Mars extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Mars",'E');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '7';
    }
}
export default Mars;