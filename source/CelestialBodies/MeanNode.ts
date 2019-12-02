import CelestialBody from './CelestialBody';
import Orbs from './Orbs';

class MeanNode extends CelestialBody 
{
    constructor(totalDegree: number)
    {
        super(totalDegree, "Mean Node",'L');
        this.Orbs = new Orbs(7, 7, 7, 7,5);
        this.Id = '13';
    }
}
export default MeanNode;