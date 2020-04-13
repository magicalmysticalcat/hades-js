import moment from 'moment-timezone';
import {IAspectService} from '../aspect-service/aspect-service.interface';
import {IEphemerisRepository} from '../ephemeris-repository/ephemeris-repository.interface';
import {HouseSystemFactory} from '../houses-service/house-system-factory';
import {TimeConversions} from '../time-conversions/time-conversions';
import {IWorldTimezoneRepository} from '../world-timezone-repository/world-timezone-repository.interface'
import { GeodeticLocation } from '../models/Location';
import { HouseSystemType } from '../houses-service/house-system-type';

export class AstrologyService 
{
    constructor (
        private ephemerisRepository:IEphemerisRepository,
        private timeConversions:TimeConversions,
        private worldTimezoneRepository: IWorldTimezoneRepository,
        private aspectService: IAspectService,
        private houseSystemFactory: HouseSystemFactory
    )
    {
    }

    async Init()
    {
        await this.ephemerisRepository.Load();
    }

    public CalculateCelestialBodiesAndTime(eventDate: moment,timeZone:string,location: GeodeticLocation)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let ephemerisLine = this.ephemerisRepository.GetLine(dateObj, coordinates.longitude);

        return ephemerisLine;
    }

    
    CalculateAspects(celestialBodies)
    {
        return this.aspectService.CalculateAspects(celestialBodies);
    }
    
    CalculateHouseSystem(systemType:HouseSystemType, eventDate:moment, timeZone:string, location:GeodeticLocation)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let trueSiderealTimeInSeconds = this.timeConversions.GetTrueSiderealTimeInSeconds(dateObj,coordinates.longitude);

        return this.houseSystemFactory.CreateHouseSystem(systemType,trueSiderealTimeInSeconds,coordinates);
    }

    GetLatAndLong(location: GeodeticLocation, timeZone: string)
    {
        let latitude = parseFloat(location.Latitude); 
        let longitude = parseFloat(location.Longitude);

        if(isNaN(latitude)||isNaN(longitude))
        {
            let geodeticalLocation = this.GetLocationGeodeticalCoordinates(timeZone);
            latitude = geodeticalLocation.latitude;
            longitude = geodeticalLocation.longitude;
        }
        return {latitude,longitude};
    }

    GetDateInUTC(eventDate: moment,timeZone:string)
    {
        return moment.tz(eventDate.format('DD.MM.YYYY HH:mm'),'DD.MM.YYYY HH:mm:ss', timeZone).utc();
    }

    GetLocationGeodeticalCoordinates(zone)
    {
        let locationDetails = this.worldTimezoneRepository.GetTimezoneInfo(zone)
        let geodeticalLocation = {
            longitude:locationDetails.Longitude,
            latitude:locationDetails.Latitude
        };
        return geodeticalLocation;
    }
}