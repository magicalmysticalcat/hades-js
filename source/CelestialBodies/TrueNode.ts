import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class TrueNode extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "True Node",'L');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '14';
    }
}
export default TrueNode;