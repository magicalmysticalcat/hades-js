import CelestialBody from './CelestialBody';

class Uranus extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Uranus",'H');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '10';
    }
}
export default Uranus;