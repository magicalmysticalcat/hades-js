const {AstrologyService, AspectService, 
    EphemerisJSONRepository, OrbJSONRepository, 
    TrigonometricUtilities,HouseSystemFactory,
    TimeConversions, WorldTimezoneRepository, 
    ZodiacFactory, GeodeticLocation, HouseSystemType,
    RetrogradesService} = require("../distribution/index.js");
const moment = require('moment-timezone');

let timeConversions = new TimeConversions();
let retrogradesService = new RetrogradesService();
let ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions,retrogradesService);
let worldTimezoneRepository = new WorldTimezoneRepository();
let orbRepository = new OrbJSONRepository();
let aspectService = new AspectService(orbRepository);
let trigonometricUtilities = new TrigonometricUtilities();
let zodiacFactory = new ZodiacFactory();
let houseSystemFactory = new HouseSystemFactory(trigonometricUtilities,zodiacFactory);


let astrologyService = new AstrologyService(ephemerisJSONRepository, 
                                        timeConversions, 
                                        worldTimezoneRepository,
                                        aspectService,
                                        houseSystemFactory);

let location = new GeodeticLocation('-58.45','-34.6');
let date = moment('1984-11-18 14:00:00');
let timezone = 'America/Argentina/Buenos_Aires';

let celestialBodiesAndTime = testPlanetCalculation();
let calculatedAspects = testAspects(celestialBodiesAndTime.CelestialBodies);
let calculatedHouses = testHouseCalculation(HouseSystemType.Placidus);

console.log(JSON.stringify(celestialBodiesAndTime));
console.log(JSON.stringify(calculatedAspects));
console.log(JSON.stringify(calculatedHouses));
                                        
function testPlanetCalculation()
{
    return astrologyService.CalculateCelestialBodiesAndTime(date, timezone, location);
}

function testAspects(celestialBodies)
{
    return astrologyService.CalculateAspects(celestialBodies);
}

function testHouseCalculation(houseSystemType)
{
    return astrologyService.CalculateHouseSystem(houseSystemType, date, timezone, location);
}