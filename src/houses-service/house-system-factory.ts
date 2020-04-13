import {PlacidusHouseSystem} from './house-systems/placidus-house-system';
import {FixedHouseSystem} from './house-systems/fixed-house-system';
import {ZodiacFactory} from '../zodiac-service/zodiac-factory';
import { ITrigonometricUtilities } from '../trigonometric-utilities/trigonometric-utilities.interface';
import moment from 'moment';
import { HouseSystemType } from './house-system-type';

export class HouseSystemFactory
{
    constructor(
        private trigonometricUtilities: ITrigonometricUtilities,
        private zodiacFactory:ZodiacFactory){

    }

    public CreateHouseSystem(systemType, trueSiderealTimeInSeconds, coordinates)
    {
        let houses = this.GetHouses(systemType,trueSiderealTimeInSeconds,coordinates.latitude,coordinates.longitude);
        return houses;
    }

    private GetHouses (houseSystem:HouseSystemType, eventDate:moment.Moment, latitude:number, longitude)
    {
        let houseCusps = [];
        if(houseSystem==HouseSystemType.Placidus)
            houseCusps = new PlacidusHouseSystem(this.trigonometricUtilities).Create(eventDate,latitude);
        else if(houseSystem == HouseSystemType.FixedSign)
            houseCusps = new FixedHouseSystem(this.trigonometricUtilities).Create(eventDate, latitude);

        let houses = new Array();
        for(let i=1;i<=12;i++)
        {
            houses.push(this.GetDecoratedHouse(i,houseCusps[i]));
        }
        return houses;
    }

    private GetDecoratedHouse(section,cuspDegree)
    {
        let zodiacSign = this.zodiacFactory.CreateZodiacSign(cuspDegree);
        return  { 
            House:section,
            Sign:zodiacSign,
            RelativeDistance:(cuspDegree-zodiacSign.StartsAt),
            FullDistance:cuspDegree
        };
    }
}

