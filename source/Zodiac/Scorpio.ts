import ZodiacSign from './ZodiacSign';

class Scorpio extends ZodiacSign
{
    constructor()
    {
        super("Scorpio",210,240,7);
        this.Symbol = 'h';
        this.Element = 'w';
        this.Mode = 'f';
        this.Rulers = ['Pluto'];
    }
}
export default Scorpio;