import ZodiacSign from './ZodiacSign';

class Sagitarius extends ZodiacSign
{
    constructor()
    {
        super("Sagittarius",240,270,8);
        this.Symbol = 'i';
        this.Element = 'f';
        this.Mode = 'm';
        this.Rulers = ['Jupiter'];
    }
}
export default Sagitarius;