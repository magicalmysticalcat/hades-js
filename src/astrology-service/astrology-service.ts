import moment from 'moment-timezone';
import {IAspectService} from '../aspect-service/aspect-service.interface';
import {IEphemerisRepository} from '../ephemeris-repository/ephemeris-repository.interface';
//import HouseSystemFactory from './Houses/HouseSystemFactory';
import {TimeConversions} from '../time-conversions/time-conversions';
import {IWorldTimezoneRepository} from '../world-timezone-repository/world-timezone-repository.interface'
import { GeodeticLocation } from '../models/Location';

export class AstrologyService 
{
    constructor (
        private _ephemerisRepository:IEphemerisRepository,
        private _timeConversions:TimeConversions,
        private _worldTimezoneRepository: IWorldTimezoneRepository,
        private _aspectService: IAspectService
    )
    {
    }

    async Init()
    {
        await this._ephemerisRepository.Load();
    }

    public CalculateCelestialBodiesAndTime(eventDate: moment,timeZone:string,location: GeodeticLocation)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let ephemerisLine = this._ephemerisRepository.GetLine(dateObj, coordinates.longitude);

        return ephemerisLine;
    }

    
    CalculateAspects(celestialBodies)
    {
        return this._aspectService.CalculateAspects(celestialBodies);
    }
    /*
    CalculateHouseSystem(systemType, eventDate, timeZone, location)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let trueSiderealTimeInSeconds = this.timeConversions.GetTrueSiderealTimeInSeconds(dateObj,coordinates.longitude);

        return HouseSystemFactory.CreateHouseSystem(systemType,trueSiderealTimeInSeconds,coordinates);
    }*/

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
        let locationDetails = this._worldTimezoneRepository.GetTimezoneInfo(zone)
        let geodeticalLocation = {
            longitude:locationDetails.Longitude,
            latitude:locationDetails.Latitude
        };
        return geodeticalLocation;
    }
}