import Aries from './model/Aries';
import Taurus from './model/Taurus';
import Gemini from './model/Gemini';
import Cancer from './model/Cancer';
import Leo from './model/Leo';
import Virgo from './model/Virgo';
import Libra from './model/Libra';
import Scorpio from './model/Scorpio';
import Sagitarius from './model/Sagitarius';
import Capricorn from './model/Capricorn';
import Aquarius from './model/Aquarius';
import Pisces from './model/Pisces';
import ZodiacSign from './model/ZodiacSign';

export class ZodiacFactory{
    public CreateZodiacSign(degree: number): ZodiacSign
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