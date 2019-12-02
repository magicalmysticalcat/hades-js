import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Saturn extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Saturn",'G');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '9';
    }
}
export default Saturn;