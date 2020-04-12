import * as  moment from 'moment';
import EphemerisLine from '../models/EphemerisLine';

export interface IEphemerisRepository
{
    Load():void;
    GetLine(dateTime: moment.Moment,longitude: number): EphemerisLine;
}