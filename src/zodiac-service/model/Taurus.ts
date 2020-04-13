import ZodiacSign from './ZodiacSign';

class Taurus extends ZodiacSign
{
    constructor()
    {
        super("Taurus",30,60,1);
        this.Symbol = 'b';
        this.Element = 'e';
        this.Mode = 'f';
        this.Rulers = ['Venus'];
    }
}
export default Taurus;