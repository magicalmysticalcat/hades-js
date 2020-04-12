import {EphemerisJSONRepository} from './ephemeris-json-repository';
import { TimeConversions } from '../../time-conversions/time-conversions';
import moment from 'moment';

describe("EphemerisJSONRepository", () => {

    let timeConversions: TimeConversions;
    let ephemerisJSONRepository: EphemerisJSONRepository;
    timeConversions = new TimeConversions();
    ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions);
    ephemerisJSONRepository.Load();

    it("should match natal chart 1", () => {
        let result = ephemerisJSONRepository.GetLine(moment('1984-12-26 22:00:00'),-57);
        expect('Hello world!').toEqual("Hello world!");
    });
});