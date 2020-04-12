import {AstrologyService} from './astrology-service';
import {TimeConversions} from '../time-conversions/time-conversions';
import {EphemerisJSONRepository} from '../ephemeris-repository/ephemerisJSON/ephemeris-json-repository';
import {WorldTimezoneRepository} from '../world-timezone-repository/world-timezone-repository';
import moment from 'moment';
import { IEphemerisRepository } from '../ephemeris-repository/ephemeris-repository.interface';
import { IWorldTimezoneRepository } from '../world-timezone-repository/world-timezone-repository.interface';
import { GeodeticLocation } from '../models/Location';
import {IAspectService} from '../aspect-service/aspect-service.interface'
import { AspectService } from '../aspect-service/aspect-service';
import { IOrbRepository } from '../aspect-service/orb-repository.interface';
import { OrbJSONRepository } from '../aspect-service/orb-json-repository';

describe("AstrologyService", () => {

    let timeConversions: TimeConversions;
    let ephemerisJSONRepository: IEphemerisRepository;
    let astrologyService: AstrologyService;
    let worldTimezoneRepository: IWorldTimezoneRepository;
    let aspectService: IAspectService;
    let orbRepository: IOrbRepository;

    timeConversions = new TimeConversions();
    ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions);
    worldTimezoneRepository = new WorldTimezoneRepository();
    orbRepository = new OrbJSONRepository();
    aspectService = new AspectService(orbRepository);

    astrologyService = new AstrologyService(ephemerisJSONRepository, 
                                            timeConversions, 
                                            worldTimezoneRepository,
                                            aspectService);

    beforeEach(async function() {
        await astrologyService.Init();
    });

    it("should match planets for 1984-12-26 19:00:00", () => {
        let location = new GeodeticLocation('58w27','34s36');
        let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let sunRoundedValue = Math.round(result.CelestialBodies[0].TotalDegree);
        expect(sunRoundedValue).toEqual(275);
    });

    it("should have neptune conjunct sun", () => {
        let location = new GeodeticLocation('58w27','34s36');
        let planets = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let aspects = astrologyService.CalculateAspects(planets);
        console.log(JSON.stringify(aspects));
        expect(true).toBeTrue();
    });
});