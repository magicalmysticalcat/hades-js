import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Mercury extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Mercury",'C');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '5';
    }
}
export default Mercury;