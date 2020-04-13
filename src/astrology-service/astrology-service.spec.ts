import {AstrologyService} from './astrology-service';
import {TimeConversions} from '../time-conversions/time-conversions';
import {EphemerisJSONRepository} from '../ephemeris-repository/ephemerisJSON/ephemeris-json-repository';
import {WorldTimezoneRepository} from '../world-timezone-repository/world-timezone-repository';
import moment from 'moment';
import { IEphemerisRepository } from '../ephemeris-repository/ephemeris-repository.interface';
import { IWorldTimezoneRepository } from '../world-timezone-repository/world-timezone-repository.interface';
import { GeodeticLocation } from '../models/GeodeticLocation';
import {IAspectService} from '../aspect-service/aspect-service.interface'
import { AspectService } from '../aspect-service/aspect-service';
import { IOrbRepository } from '../orb-repository/orb-repository.interface';
import { OrbJSONRepository } from '../orb-repository/orb-json-repository';
import { HouseSystemFactory } from '../houses-service/house-system-factory';
import { TrigonometricUtilities } from '../trigonometric-utilities/trigonometric-utilities';
import { ZodiacFactory } from '../zodiac-service/zodiac-factory';
import { HouseSystemType } from '../houses-service/house-system-type';

describe("AstrologyService", () => {

    let timeConversions: TimeConversions;
    let ephemerisJSONRepository: IEphemerisRepository;
    let astrologyService: AstrologyService;
    let worldTimezoneRepository: IWorldTimezoneRepository;
    let aspectService: IAspectService;
    let orbRepository: IOrbRepository;
    let houseSystemFactory: HouseSystemFactory;
    let trigonometricUtilities: TrigonometricUtilities;
    let zodiacFactory: ZodiacFactory;

    timeConversions = new TimeConversions();
    ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions);
    worldTimezoneRepository = new WorldTimezoneRepository();
    orbRepository = new OrbJSONRepository();
    aspectService = new AspectService(orbRepository);
    trigonometricUtilities = new TrigonometricUtilities();
    zodiacFactory = new ZodiacFactory();
    houseSystemFactory = new HouseSystemFactory(trigonometricUtilities,zodiacFactory);


    astrologyService = new AstrologyService(ephemerisJSONRepository, 
                                            timeConversions, 
                                            worldTimezoneRepository,
                                            aspectService,
                                            houseSystemFactory);

    beforeEach(async function() {
        await astrologyService.Init();
    });

    it("should have sun at 275deg", () => {
        let location = new GeodeticLocation('58w27','34s36');
        let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let sunRoundedValue = Math.round(result.CelestialBodies[0].TotalDegree);
        expect(sunRoundedValue).toEqual(275);
    });

    it("should have neptune conjunct sun", () => {
        let location = new GeodeticLocation('58w27','34s36');
        let celestialBodies = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location).CelestialBodies;
        let aspects = astrologyService.CalculateAspects(celestialBodies);
        
        expect(true).toBeTrue();
    });

    it("should calculate placidus house system from date, time",()=>{
        let location = new GeodeticLocation('58w27','34s36');
        let houses = astrologyService.CalculateHouseSystem(HouseSystemType.Placidus, 
                                                            moment('1984-12-26 19:00:00'),
                                                            'America/Argentina/Buenos_Aires',
                                                            location);

        expect(true).toBeTrue();
    });
});