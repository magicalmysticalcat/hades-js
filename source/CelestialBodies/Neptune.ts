import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Neptune extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Neptune",'I');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '11';
    }
}
export default Neptune;