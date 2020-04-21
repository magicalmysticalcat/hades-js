import {EphemerisJSONRepository} from './ephemeris-json-repository';
import { TimeConversions } from '../../time-conversions/time-conversions';
import moment from 'moment';
import {RetrogradesService} from '../../retrogades-service/retrogades-service';
import { CelestialBody } from '../../models/CelestialBody';
import { EphemerisDbLineColumnIndex } from './model/EphemerisDbLineColumnIndex';

describe("EphemerisJSONRepository", () => {

    let timeConversions: TimeConversions;
    let ephemerisJSONRepository: EphemerisJSONRepository;
    let retrogradesService: RetrogradesService;

    timeConversions = new TimeConversions();
    retrogradesService = new RetrogradesService();
    ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions,retrogradesService);
    ephemerisJSONRepository.Load();

    xit("should match natal chart 1", () => {
        let result = ephemerisJSONRepository.GetLine(moment('1984-12-26 22:00:00'),-57);
    });

    it('should have mercury retrograde',()=>{
        let line = ephemerisJSONRepository.GetLine(moment('2020-06-19 22:00:00'),-57);
        let result = false;
        line.CelestialBodies.forEach(celestialBody => {
            if(celestialBody.Name===EphemerisDbLineColumnIndex[EphemerisDbLineColumnIndex.Mercury] &&
                celestialBody.IsRetrograde)
            {

                result = true;
            }
        });
        expect(result).toBeTrue();
    });

    it('should have jupiter retrograde',()=>{
        let line = ephemerisJSONRepository.GetLine(moment('2020-06-19 22:00:00'),-57);
        let result = false;
        line.CelestialBodies.forEach(celestialBody => {
            if(celestialBody.Name==='Jupiter' &&
                celestialBody.IsRetrograde)
            {
                result = true;
            }
        });
        expect(result).toBeTrue();
    });

    it('should not have mercury retrograde',()=>{
        let line = ephemerisJSONRepository.GetLine(moment('2020-06-18 02:00:00'),-57);
        let result = false;
        line.CelestialBodies.forEach(celestialBody => {
            if(celestialBody.Name==='Mercury' &&
                celestialBody.IsRetrograde)
            {
                result = true;
            }
        });
        expect(result).toBeFalse();
    });

    it('should have saturn retrograde',()=>{
        let line = ephemerisJSONRepository.GetLine(moment('2020-05-11 22:00:00'),0);
        let result = false;
        line.CelestialBodies.forEach(celestialBody => {
            if(celestialBody.Name==='Saturn' &&
                celestialBody.IsRetrograde)
            {
                result = true;
            }
        });
        expect(result).toBeTrue();
    });

});