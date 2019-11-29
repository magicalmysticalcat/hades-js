import CelestialBody from './CelestialBody';

class TrueNode extends CelestialBody 
{
    constructor(totalDegree)
    {
        super(totalDegree, "True Node",'L');
        this.Orbs = {Conjunction:7, Opposition:7, Square:7, Trine:7, Sextile:5};
        this.Id = '14';
    }
}
export default TrueNode;