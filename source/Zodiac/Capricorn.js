import ZodiacSign from './ZodiacSign';

class Capricorn extends ZodiacSign
{
    constructor()
    {
        super("Capricorn",270,300,9);
        this.Symbol = 'j';
        this.Element = 'e';
        this.Mode = 'c';
        this.Rulers = ['Saturn'];
    }
}
export default Capricorn;