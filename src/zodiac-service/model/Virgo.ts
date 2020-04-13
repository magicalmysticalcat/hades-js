import ZodiacSign from './ZodiacSign';

class Virgo extends ZodiacSign
{
    constructor()
    {
        super("Virgo",150,180,5);
        this.Symbol = 'f';
        this.Element = 'e';
        this.Mode = 'm';
        this.Rulers = ['Mercury'];
    }
}
export default Virgo;