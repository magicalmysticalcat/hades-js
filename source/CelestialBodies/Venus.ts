import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class Venus extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Venus",'D');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '6';
    }
}
export default Venus;