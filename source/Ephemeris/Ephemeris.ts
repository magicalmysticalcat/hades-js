import moment from 'moment';
import TimeConversions from '../TimeConversions';
import Jupiter from '../CelestialBodies/Jupiter';
import Mars from '../CelestialBodies/Mars';
import Mercury from '../CelestialBodies/Mercury';
import Moon from '../CelestialBodies/Moon';
import Neptune from '../CelestialBodies/Neptune';
import Pluto from '../CelestialBodies/Pluto';
import Saturn from '../CelestialBodies/Saturn';
import Sun from '../CelestialBodies/Sun';
import TrueNode from '../CelestialBodies/TrueNode';
import Uranus from '../CelestialBodies/Uranus';
import Venus from '../CelestialBodies/Venus';
import EphemerisLine from './EphemerisLine';
import EphemerisFile from './resources/ephemeris/daysWithPlanets.json';
import EphemerisDbYear from './EphemerisDbYear';
import CelestialBody from '../CelestialBodies/CelestialBody';
import { EphemerisDbLineColumnIndex } from './EphemerisDbLineColumnIndex';
import EphemerisDbLine from './EphemerisDbLine';

export class Ephemeris
{
    TimeConversions: TimeConversions;
    EphemerisDb: EphemerisDbYear[];
    constructor()
    {
        this.TimeConversions = new TimeConversions();
    }

    LoadEphemeris()
    {
        this.EphemerisDb = EphemerisFile;
    }

    GetCalculatedEphemerisLine(dateTime: moment,longitude: number) : EphemerisLine
    {
        let ephemerisLines = this.GetEphemerisLinesByDateWithPadding(dateTime,1);
        let eventTrueSidTimeInSeconds = this.TimeConversions.GetTrueSiderealTimeInSeconds(dateTime,longitude);
        let eventTimeInDecimal = dateTime.hour() + (dateTime.minute() / 60) + (dateTime.second() / 60 / 60);
        let olderLine = ephemerisLines[1];
        let newestLine = ephemerisLines[2];
        let ephemerisLine = new EphemerisLine();
        ephemerisLine.SiderealTime = eventTrueSidTimeInSeconds;
        ephemerisLine.JulianDay = parseFloat(ephemerisLines[1].Columns[EphemerisDbLineColumnIndex.JulianDay]);
        ephemerisLine.Order = 0;
        ephemerisLine.CelestialBodies = [];
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Sun, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Moon, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Mercury, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Venus, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Mars, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Jupiter, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Saturn, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Uranus, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Neptune, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.Pluto, olderLine, newestLine));
        ephemerisLine.CelestialBodies.push(this.CreatePlanet(eventTimeInDecimal, EphemerisDbLineColumnIndex.TrueNode, olderLine, newestLine));
        return ephemerisLine;
    }

    CreatePlanet(eventTime: number,
        planetIndex: EphemerisDbLineColumnIndex, 
        previousDateLine: EphemerisDbLine, 
        newestDateLine: EphemerisDbLine): CelestialBody
    {
        let degreeForPlanet = this.GetDegreeForPlanet(eventTime,
                                                    parseFloat(previousDateLine.Columns[planetIndex]),
                                                    parseFloat(newestDateLine.Columns[planetIndex]));
        switch (planetIndex) {
            case EphemerisDbLineColumnIndex.Sun:
                return new Sun(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Moon:
                return new Moon(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Mercury:
                return new Mercury(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Venus:
                return new Venus(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Mars:
                return new Mars(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Jupiter:
                return new Jupiter(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Saturn:
                return new Saturn(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Uranus:
                return new Uranus(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Neptune:
                return new Neptune(degreeForPlanet);
            case EphemerisDbLineColumnIndex.Pluto:
                return new Pluto(degreeForPlanet);
            case EphemerisDbLineColumnIndex.TrueNode:
                return new TrueNode(degreeForPlanet);
            default:
                break;
        }
    }


    GetDegreeForPlanet(eventTimeInDecimal: number, planetDegreeLower: number, planetDegreeHigher: number): number
    {
        let planetDegreeCoeff = (planetDegreeHigher - planetDegreeLower) / 24;
        let planetDegree = planetDegreeLower + (planetDegreeCoeff * eventTimeInDecimal);
        return planetDegree;
    }

    GetEphemerisLinesByDateWithPadding(date: moment,dayPadding: number): EphemerisDbLine []
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
            ephemerisLines.push(new EphemerisDbLine(-i, prevEphemerisLine));
            ephemerisLines.push(new EphemerisDbLine(i, futureEphemerisLine));
        }
        ephemerisLines = this.SortByKey(ephemerisLines,'Order');
        return ephemerisLines;
    }

    GetEphemerisLineForDate(date: moment): string []
    {
        let formattedDate = date.year()+'-'+(date.month()+1)+'-'+date.date();

        let ephemerisDbYear = this.EphemerisDb.find((ephemerisDbYear: EphemerisDbYear)=>
                    {
                        if(ephemerisDbYear.year == date.year())
                        {
                            return ephemerisDbYear;
                        }
                    });

        let day = ephemerisDbYear.days.find((day: string [])=>
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


