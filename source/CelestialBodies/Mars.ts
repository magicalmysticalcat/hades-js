import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Mars extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Mars",'E');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '7';
    }
}
export default Mars;