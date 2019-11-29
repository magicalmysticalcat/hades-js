import Aries from './Aries';
import Taurus from './Taurus';
import Gemini from './Gemini';
import Cancer from './Cancer';
import Leo from './Leo';
import Virgo from './Virgo';
import Libra from './Libra';
import Scorpio from './Scorpio';
import Sagitarius from './Sagitarius';
import Capricorn from './Capricorn';
import Aquarius from './Aquarius';
import Pisces from './Pisces';

class ZodiacFactory
{

    static CreateZodiacSign(degree)
    {
        if(degree>=0 && degree <30 || degree == 360)
            return new Aries();
        else if(degree>=30 && degree <60)
            return new Taurus();
        else if(degree>=60 && degree <90)
            return new Gemini();
        else if(degree>=90 && degree <120)
            return new Cancer();
        else if(degree>=120 && degree <150)
            return new Leo();
        else if(degree>=150 && degree <180)
            return new Virgo();
        else if(degree>=180 && degree <210)
            return new Libra();
        else if(degree>=210 && degree <240)
            return new Scorpio();
        else if(degree>=240 && degree <270)
            return new Sagitarius();
        else if(degree>=270 && degree <300)
            return new Capricorn();
        else if(degree>=300 && degree <330)
            return new Aquarius();
        else
            return new Pisces();
    }
}
export default ZodiacFactory;