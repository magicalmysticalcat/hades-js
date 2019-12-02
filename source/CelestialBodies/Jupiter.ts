import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Jupiter extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Jupiter",'F');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '8';
    }
}
export default Jupiter;