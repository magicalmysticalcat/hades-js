const {AstrologyService, AspectService, 
    EphemerisJSONRepository, OrbJSONRepository, 
    TrigonometricUtilities,HouseSystemFactory,
    TimeConversions, WorldTimezoneRepository, 
    ZodiacFactory, GeodeticLocation} = require("../../distribution/src/index.js");
const moment = require('moment');


let timeConversions = new TimeConversions();
let ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions);
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
testPlanetCalculation();
                                        
async function testPlanetCalculation()
{
    await astrologyService.Init();
    let location = new GeodeticLocation('58w27','34s36');
    let result = astrologyService.CalculateCelestialBodiesAndTime(moment('1984-12-26 19:00:00'),
                                'America/Argentina/Buenos_Aires', 
                                location);
    let sunRoundedValue = Math.round(result.CelestialBodies[0].TotalDegree);
}