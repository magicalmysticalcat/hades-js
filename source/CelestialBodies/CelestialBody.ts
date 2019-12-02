import CreateZodiacSign from '../Zodiac/ZodiacFactory';
import ZodiacTools from '../Zodiac/ZodiacTools';
import Orbs from './Orbs';
import ZodiacSign from '../Zodiac/ZodiacSign';

class CelestialBody 
{
    TotalDegree: number;
    Name: string;
    Symbol: string;
    Orbs: Orbs;
    Id: string;
    DegreesPerDay: number;
    RelativeDegree: number;
    ZodiacSign: ZodiacSign;

    constructor(totalDegree: number, name: string, symbol: string)
    {
        this.TotalDegree = totalDegree;
        this.Name = name;
        this.Symbol = symbol;
        this.ZodiacSign = CreateZodiacSign(this.TotalDegree);
        this.RelativeDegree = ZodiacTools.GetRelativeZodiacDegree(this.TotalDegree);
        this.Id = '';
        this.DegreesPerDay = 0;
    }
}
export default CelestialBody;