import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Pluto extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Pluto",'J');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '12';
    }
}
export default Pluto;