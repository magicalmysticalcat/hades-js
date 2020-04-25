![GitHub](https://img.shields.io/github/license/magicalmysticalcat/hades-js?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/magicalmysticalcat/hades-js)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/magicalmysticalcat/hades-js/implementation%20tests%20(master)/master?label=implementation%20tests%20%28master%29&style=flat-square)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/magicalmysticalcat/hades-js/unit%20tests%20(master)/master?label=unit%20tests%20%28master%29&style=flat-square)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/magicalmysticalcat/hades-js/implementation%20tests%20(dev)/develop?label=implementation%20tests%20%28develop%29&style=flat-square)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/magicalmysticalcat/hades-js/unit%20tests%20(dev)/develop?label=unit%20tests%20%28develop%29&style=flat-square)

# Hades-js v2.1.2

Don't use this module comercially. It's not stable and I'm still working on the tests and improvements like mid-points, other house systems, more minor aspects, etc.

### Features

- Celestial body positions from a geocentric point of view.
- Supported celestial bodies: Sun, Moon, Mercury, Venus, Mars, Jupiter, Pluto, Saturn, Uranus, Neptune,
  Mean Node, True Node, Chiron, Ceres, Pallas, Juno, Vesta. Support for retrogrades.
- Placidus house system calculation.
- ASC, MC, Julian day and sidereal time.
- Aspects: Conjunction, Opposition, Square, Trine, Sextile.

#### Install

`$ npm install @goldenius/hades-js`

#### Usage

At the moment you may only get data for dates between 1900-2050. This is because Hades at the moment does not calculate the points from scratch. It relies on ephemeris (check the resources folder) fed into it.

The easiest way to retrieve planetary positions with aspects and house calculations is to input:
- date and time (momentjs date object)
- timezone
- geodetic location

for example:
```javascript

const {AstrologyService, AspectService, 
    EphemerisJSONRepository, OrbJSONRepository, 
    TrigonometricUtilities,HouseSystemFactory,
    TimeConversions, WorldTimezoneRepository, 
    ZodiacFactory, GeodeticLocation, HouseSystemType,
    RetrogradesService} = require("@goldenius/hades-js");
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
```
Regarding House Systems, at this point the only one that is working correctly is Placidus.
