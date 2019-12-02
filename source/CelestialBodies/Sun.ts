import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Sun extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Sun",'A');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '3';
    }
}
export default Sun;