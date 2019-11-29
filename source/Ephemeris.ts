import moment from 'moment';
import TimeConversions from './TimeConversions';
import Jupiter from './CelestialBodies/Jupiter';
import Mars from './CelestialBodies/Mars';
import MeanNode from './CelestialBodies/MeanNode';
import Mercury from './CelestialBodies/Mercury';
import Moon from './CelestialBodies/Moon';
import Neptune from './CelestialBodies/Neptune';
import Pluto from './CelestialBodies/Pluto';
import Saturn from './CelestialBodies/Saturn';
import Sun from './CelestialBodies/Sun';
import TrueNode from './CelestialBodies/TrueNode';
import Uranus from './CelestialBodies/Uranus';
import Venus from './CelestialBodies/Venus';

class Ephemeris
{
    constructor()
    {
        this.timeConversions = new TimeConversions();
    }

    LoadEphemeris()
    {
        this.ephemerisDb = require('./resources/ephemeris/daysWithPlanets.json');
    }

    GetCalculatedEphemerisLine(dateWithTime,longitude)
    {
        let ephemerisLines = this.GetEphemerisLinesByDateWithPadding(dateWithTime,1);
        let eventTrueSidTimeInSeconds = this.timeConversions.GetTrueSiderealTimeInSeconds(dateWithTime,longitude);
        let eventTimeInDecimal = dateWithTime.hour() + (dateWithTime.minute() / 60) + (dateWithTime.second() / 60 / 60);
        let olderLine = ephemerisLines[1];
        let newestLine = ephemerisLines[2];
        let ephemerisLine = {
            SiderealTime : eventTrueSidTimeInSeconds,
            JulianDay: parseFloat(ephemerisLines[1].ephemerisLine[2]),
            CelestialBodies: [
                new Sun(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[3]),parseFloat(newestLine.ephemerisLine[3]))),
                new Moon(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[4]),parseFloat(newestLine.ephemerisLine[4]))),
                new Mercury(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[5]),parseFloat(newestLine.ephemerisLine[5]))),
                new Venus(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[6]),parseFloat(newestLine.ephemerisLine[6]))),
                new Mars(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[7]),parseFloat(newestLine.ephemerisLine[7]))),
                new Jupiter(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[8]),parseFloat(newestLine.ephemerisLine[8]))),
                new Saturn(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[9]),parseFloat(newestLine.ephemerisLine[9]))),
                new Uranus(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[10]),parseFloat(newestLine.ephemerisLine[10]))),
                new Neptune(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[11]),parseFloat(newestLine.ephemerisLine[11]))),
                new Pluto(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[12]),parseFloat(newestLine.ephemerisLine[12]))),
                //new MeanNode(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[13]),parseFloat(newestLine.ephemerisLine[13]))),
                new TrueNode(this.GetDegreeForPlanet(eventTimeInDecimal,parseFloat(olderLine.ephemerisLine[14]),parseFloat(newestLine.ephemerisLine[14]))),
            ]
        }

        return ephemerisLine;
    }
    
    GetCalculatedEphemerisLineBasedOnCelestialBody (dateObj, longitude, celestialBody)
    {

    }

    GetDegreeForPlanet(eventTimeInDecimal, planetDegreeLower, planetDegreeHigher)
    {
        let planetDegreeCoeff = (planetDegreeHigher - planetDegreeLower) / 24;
        let planetDegree = planetDegreeLower + (planetDegreeCoeff * eventTimeInDecimal);
        return planetDegree;
    }

    GetEphemerisLinesByDateWithPadding(date,dayPadding)
    {
        let ephemerisLines = [];
        let ephemerisLineForRequestedDate = this.GetEphemerisLineForDate(date);
        ephemerisLines.push({order:0, ephemerisLine:ephemerisLineForRequestedDate});

        for(let i=1;i<=dayPadding;i++)
        {
            let prevDate = date.clone().subtract(i,'days');
            let futureDate = date.clone().add(i,'days');
            let prevEphemerisLine = this.GetEphemerisLineForDate(prevDate);
            let futureEphemerisLine = this.GetEphemerisLineForDate(futureDate);
            ephemerisLines.push({order:-i, ephemerisLine:prevEphemerisLine});
            ephemerisLines.push({order:i, ephemerisLine:futureEphemerisLine});
        }
        ephemerisLines = this.SortByKey(ephemerisLines,'order');
        return ephemerisLines;
    }

    GetEphemerisLineForDate(date)
    {
        let formattedDate = date.year()+'-'+(date.month()+1)+'-'+date.date();

        let year = this.ephemerisDb.find((element)=>
                    {
                        if(element.year == date.year())
                        {
                            return element;
                        }
                    });

        let day = year.days.find((day)=>
                    {
                        if(day[0]==formattedDate)
                        {
                            return day;
                        }
                    });
        return day;
    }

    SortByKey(array, key) {
        return array.sort(function(a, b) {
            let x = a[key]; 
            let y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

}
export default Ephemeris;