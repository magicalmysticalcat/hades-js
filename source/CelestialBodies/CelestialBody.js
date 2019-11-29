import ZodiacFactory from '../Zodiac/ZodiacFactory';
import ZodiacTools from '../Zodiac/ZodiacTools';

class CelestialBody 
{
    constructor(totalDegree, name, symbol)
    {
        this.TotalDegree = totalDegree;
        this.Name = name;
        this.Symbol = symbol;
        this.ZodiacSign = ZodiacFactory.CreateZodiacSign(this.TotalDegree);
        this.RelativeDegree = ZodiacTools.GetRelativeZodiacDegree(this.TotalDegree);
        this.Orbs = {};
        this.Id = '';
        this.DegreesPerDay = 0;
    }
}
export default CelestialBody;