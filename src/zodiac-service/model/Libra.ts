import ZodiacSign from './ZodiacSign';

class Libra extends ZodiacSign
{
    constructor()
    {
        super("Libra",180,210,6);
        this.Symbol = 'g';
        this.Element = 'a';
        this.Mode = 'c';
        this.Rulers = ['Venus'];
    }
}
export default Libra;