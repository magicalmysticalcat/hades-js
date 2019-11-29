class CountriesAndTimezones {
    constructor()
    {
        let all = require('./resources/countriesAndTimezones/countriesAndTimezones.json');
        this.countries = all.countries;
        this.zones = all.zones;
    }

    GetCountryDetails(country)
    {
        for (var key in this.countries) 
        {
            if (this.countries.hasOwnProperty(key)) 
            {
                if(this.countries[key].abbr==country)
                    return this.countries[key];
            }
        }
    }

    GetTimeZoneInfo(zone)
    {
        for (var key in this.zones) 
        {
            if (key == zone && this.zones.hasOwnProperty(key)) 
            {
                return this.zones[key];
            }
        }
    }

}
export default CountriesAndTimezones;