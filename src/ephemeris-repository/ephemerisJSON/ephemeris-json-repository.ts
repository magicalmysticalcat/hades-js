import { IEphemerisRepository } from "../ephemeris-repository.interface";
import moment from 'moment';
import EphemerisSource from './resources/ephemerisDb.json'
import {EphemerisLine} from "../../models/EphemerisLine";
import {EphemerisDbLine} from "./model/EphemerisDbLine";
import {EphemerisDbYear} from "./model/EphemerisDbYear";
import { EphemerisDbLineColumnIndex } from "./model/EphemerisDbLineColumnIndex";
import {CelestialBody} from "../../models/CelestialBody";
import { TimeConversions } from "../../time-conversions/time-conversions";

export class EphemerisJSONRepository implements IEphemerisRepository{

    private ephemerisDb = EphemerisSource as any;

    constructor(
        private timeConversions: TimeConversions
    ){}

    public Load(): void {
    }
    
    public GetLine(dateTime: moment.Moment, longitude: number): EphemerisLine {
        let ephemerisLines = this.GetEphemerisLinesByDateWithPadding(dateTime,1);
        let eventTrueSidTimeInSeconds = this.timeConversions.GetTrueSiderealTimeInSeconds(dateTime,longitude);
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

    private CreatePlanet(eventTime: number,
        planetIndex: EphemerisDbLineColumnIndex, 
        previousDateLine: EphemerisDbLine, 
        newestDateLine: EphemerisDbLine): CelestialBody
    {
        let degreeForPlanet = this.GetDegreeForPlanet(eventTime,
                                                    parseFloat(previousDateLine.Columns[planetIndex]),
                                                    parseFloat(newestDateLine.Columns[planetIndex]));
        return new CelestialBody(degreeForPlanet,EphemerisDbLineColumnIndex[planetIndex]);
    }

    private GetDegreeForPlanet(eventTimeInDecimal: number, planetDegreeLower: number, planetDegreeHigher: number): number
    {
        let planetDegreeCoeff = (planetDegreeHigher - planetDegreeLower) / 24;
        let planetDegree = planetDegreeLower + (planetDegreeCoeff * eventTimeInDecimal);
        return planetDegree;
    }

    private GetEphemerisLinesByDateWithPadding(date: moment.Moment,dayPadding: number): EphemerisDbLine []
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

    private GetEphemerisLineForDate(date: moment.Moment): string []
    {
        let formattedDate = date.year()+'-'+(date.month()+1)+'-'+date.date();

        let ephemerisDbYear = this.ephemerisDb.find((ephemerisDbYear: EphemerisDbYear)=>
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

    private SortByKey(array:any[], key:string) {
        return array.sort(function(a, b) {
            let x = a[key]; 
            let y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

}