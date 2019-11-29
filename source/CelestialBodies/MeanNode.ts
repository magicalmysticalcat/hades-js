import CelestialBody from './CelestialBody';

class MeanNode extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "Mean Node",'L');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '13';
    }
}
export default MeanNode;