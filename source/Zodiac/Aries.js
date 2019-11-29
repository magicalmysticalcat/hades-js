import ZodiacSign from './ZodiacSign';

class Aries extends ZodiacSign
{
    constructor()
    {
        super("Aries",0,30,0);
        this.Symbol = 'a';
        this.Element = 'f';
        this.Mode = 'c';
        this.Rulers = ['Mars'];
    }
}
export default Aries;