import CelestialBody from './CelestialBody';

class Pluto extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Pluto",'J');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '12';
    }
}
export default Pluto;