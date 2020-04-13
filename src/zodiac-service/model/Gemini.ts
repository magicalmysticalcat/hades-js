import ZodiacSign from './ZodiacSign';

class Gemini extends ZodiacSign
{
    constructor()
    {
        super("Gemini",60,90,2);
        this.Symbol = 'c';
        this.Element = 'a';
        this.Mode = 'm';
        this.Rulers = ['Mercury'];
    }
}
export default Gemini;