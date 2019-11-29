import ZodiacSign from './ZodiacSign';

class Pisces extends ZodiacSign
{
    constructor()
    {
        super("Pisces",330,360,11);
        this.Symbol = 'l';
        this.Element = 'w';
        this.Mode = 'm';
        this.Rulers = ['Neptune'];
    }
}
export default Pisces;