import * as Atlas from './resources/worldTimezones.json';
import { Zone } from '../models/Zone';
import { Country } from '../models/Country';
import { IWorldTimezoneRepository } from './world-timezone-repository.interface';

export class WorldTimezoneRepository implements IWorldTimezoneRepository{

    private countries: any;
    private zones : any;

    constructor()
    {
        this.countries = Atlas.countries;
        this.zones = Atlas.zones;
    }

    public GetCountryDetails(countryCode:string):Country
    {
        for (var key in this.countries) 
        {
            if (this.countries.hasOwnProperty(key)) 
            {
                if(this.countries[key].abbr==countryCode)
                {
                    let country = new Country();
                    country.Name = this.countries[key].name;
                    country.Abbreviation = this.countries[key].abbr;
                    country.Zones = this.countries[key].zones;
                    return country;
                }    
            }
        }
        throw new Error('Country not found');
    }

    public GetTimezoneInfo(zoneName: string): Zone
    {
        for (var key in this.zones) 
        {
            if (key == zoneName && this.zones.hasOwnProperty(key)) 
            {
                let zone = new Zone();
                zone.Name = this.zones[key].name;
                zone.Latitude = this.zones[key].lat;
                zone.Longitude = this.zones[key].long;
                zone.Countries = this.zones[key].countries;
                zone.Comments = this.zones[key].comments;
                return zone;
            }
        }
        throw new Error('Timezone information not found');
    }
}


