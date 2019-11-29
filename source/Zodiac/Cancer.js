import ZodiacSign from './ZodiacSign';

class Cancer extends ZodiacSign
{
    constructor()
    {
        super("Cancer",90,120,3);
        this.Symbol = 'd';
        this.Element = 'w';
        this.Mode = 'c';
        this.Rulers = ['Moon'];
    }
}
export default Cancer;