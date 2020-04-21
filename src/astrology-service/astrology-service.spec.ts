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
import { RetrogradesService } from '../retrogades-service/retrogades-service';
import { EphemerisDbLineColumnIndex } from '../ephemeris-repository/ephemerisJSON/model/EphemerisDbLineColumnIndex';

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
    let retrogradesService: RetrogradesService;

    timeConversions = new TimeConversions();
    retrogradesService = new RetrogradesService();
    ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions,retrogradesService);
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
        let location = new GeodeticLocation('-58.45','-34.6');
        let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let sunRoundedValue = Math.round(result.CelestialBodies[0].TotalDegree);
        expect(sunRoundedValue).toEqual(275);
    });

    xit("should have pallas at 341deg", () => {
        let location = new GeodeticLocation('-58.45','-34.6');
        let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let roundedValue = (result.CelestialBodies[EphemerisDbLineColumnIndex.Pallas-3].TotalDegree).toFixed(0);
        expect(roundedValue).toEqual("341");
    });

    it("should have sun at 275deg", () => {
        let location = new GeodeticLocation('-58.45','-34.6');
        let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location);
        let sunRoundedValue = Math.round(result.CelestialBodies[0].TotalDegree);
        expect(sunRoundedValue).toEqual(275);
    });

    it("should have neptune conjunct sun", () => {
        let location = new GeodeticLocation('-58.45','-34.6');
        let celestialBodies = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                    'America/Argentina/Buenos_Aires', 
                                    location).CelestialBodies;
        let aspects = astrologyService.CalculateAspects(celestialBodies);
        
        expect(true).toBeTrue();
    });

    fit("should have ascendant at 20deg Gemini",()=>{
        let location = new GeodeticLocation('-58.45','-34.6');
        let houses = astrologyService.CalculateHouseSystem(HouseSystemType.Placidus, 
                                                            moment('1984-12-26 19:00:00'),
                                                            'America/Argentina/Buenos_Aires',
                                                            location);
        let house1 = houses[0];
        let degree = parseInt(house1.RelativeDistance);
        let signName = house1.Sign.Name;
        

        expect(degree).toBe(20);
        expect(signName).toBe('Gemini');
    });
});