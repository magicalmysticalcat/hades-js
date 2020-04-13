import ZodiacSign from './ZodiacSign';

class Leo extends ZodiacSign
{
    constructor()
    {
        super("Leo",120,150,4);
        this.Symbol = 'e';
        this.Element = 'f';
        this.Mode = 'f';
        this.Rulers = ['Sun'];
    }
}
export default Leo;