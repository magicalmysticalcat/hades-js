import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Moon extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Moon",'B');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '4';
    }
}
export default Moon;