import PlacidusSystem from './PlacidusSystem';
import FixedSystem from './FixedSystem';
import CreateZodiacSign from '../Zodiac/ZodiacFactory';

class HouseSystemFactory
{
    static CreateHouseSystem(systemType, trueSiderealTimeInSeconds, coordinates)
    {
        let houses = HouseSystemFactory.GetHouses(systemType,trueSiderealTimeInSeconds,coordinates.latitude,coordinates.longitude);
        return houses;
    }

    static GetHouses (houseSystem, eventDate, latitude, longitude)
    {
        let houseCusps = [];
        if(houseSystem=='Placidus')
            houseCusps = new PlacidusSystem().Create(eventDate,latitude, longitude);
        else if(houseSystem == 'Fixed')
            houseCusps = new FixedSystem().Create(eventDate, latitude, longitude);

        let houses = new Array();
        for(let i=1;i<=12;i++)
        {
            houses.push(HouseSystemFactory.GetDecoratedHouse(i,houseCusps[i]));
        }
        return houses;
    }

    static GetDecoratedHouse(section,cuspDegree)
    {
        let zodiacSign = CreateZodiacSign(cuspDegree);
        return  { 
            House:section,
            Sign:zodiacSign,
            RelativeDistance:(cuspDegree-zodiacSign.StartsAt),
            FullDistance:cuspDegree
        };
    }
}
export default HouseSystemFactory;