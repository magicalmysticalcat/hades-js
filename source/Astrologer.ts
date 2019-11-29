import moment from 'moment-timezone';
import AspectCalculator from './AspectCalculator';
import Ephemeris from './Ephemeris';
import HouseSystemFactory from './Houses/HouseSystemFactory';
import TimeConversions from './TimeConversions';
import CountriesAndTimezones from './CountriesAndTimezones'

class Astrologer 
{
    constructor ()
    {
        this.aspectCalculator = new AspectCalculator();
        this.ephemeris = new Ephemeris();
        this.timeConversions = new TimeConversions();
        this.countriesAndTimezones = new CountriesAndTimezones();
    }

    async Init()
    {
        await this.ephemeris.LoadEphemeris();
    }

    CalculateCelestialBodiesAndTime(eventDate,timeZone,location)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let ephemerisLine = this.ephemeris.GetCalculatedEphemerisLine(dateObj, coordinates.longitude);

        return ephemerisLine;
    }

    CalculateCelestialBodiesAndTimeReversed(celestialBody, location, eventDate, timeZone)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let ephemerisLine = this.ephemeris.GetCalculatedEphemerisLineBasedOnCelestialBody(dateObj, coordinates.longitude, celestialBody);

        return ephemerisLine;
    }

    CalculateAspects(celestialBodies)
    {
        return this.aspectCalculator.CalculateAspects(celestialBodies);
    }

    CalculateHouseSystem(systemType, eventDate, timeZone, location)
    {
        let coordinates = this.GetLatAndLong(location,timeZone); 
        let dateObj = this.GetDateInUTC(eventDate,timeZone);
        let trueSiderealTimeInSeconds = this.timeConversions.GetTrueSiderealTimeInSeconds(dateObj,coordinates.longitude);

        return HouseSystemFactory.CreateHouseSystem(systemType,trueSiderealTimeInSeconds,coordinates);
    }

    GetLatAndLong(location, timeZone)
    {
        let latitude = parseFloat(location.latitude); 
        let longitude = parseFloat(location.longitude);

        if(isNaN(latitude)||isNaN(longitude))
        {
            let geodeticalLocation = this.GetLocationGeodeticalCoordinates(timeZone);
            latitude = geodeticalLocation.latitude;
            longitude = geodeticalLocation.longitude;
        }
        return {latitude,longitude};
    }

    GetDateInUTC(eventDate,timeZone)
    {
        return moment.tz(eventDate.format('DD.MM.YYYY HH:mm'),'DD.MM.YYYY HH:mm:ss', timeZone).utc();
    }

    GetLocationGeodeticalCoordinates(zone)
    {
        let locationDetails = this.countriesAndTimezones.GetTimeZoneInfo(zone)
        let geodeticalLocation = {
            longitude:locationDetails.long,
            latitude:locationDetails.lat
        };
        return geodeticalLocation;
    }
}
export default Astrologer;