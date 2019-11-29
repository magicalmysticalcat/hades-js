import ZodiacSign from './ZodiacSign';

class Aries extends ZodiacSign
{
    constructor()
    {
        super("Aquarius",300,330,10);
        this.Symbol = 'k';
        this.Element = 'a';
        this.Mode = 'f';
        this.Rulers = ['Uranus'];
    }
}
export default Aries;