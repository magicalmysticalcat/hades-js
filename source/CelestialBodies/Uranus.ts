import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Uranus extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Uranus",'H');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '10';
    }
}
export default Uranus;