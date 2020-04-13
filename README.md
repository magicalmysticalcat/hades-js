
# Hades-js

### Features

- Planetary positions from a geocentric point of view.
- Placidus and Fixed house systems.
- ASC, MC, Julian day and sidereal time.

#### Install

`$ npm install @goldenius/hades-js`

#### Usage
Before using this library, it's necessary to initialise it so it loads some needed resources:
```javascript
const {Astrologer} = require("@goldenius/hades-js")
let astrologer = new Astrologer();
await astrologer.Init();
```

The easiest way to retrieve planetary positions with aspects and house calculations is to input:
- date and time (momentjs date object)
- timezone
- geodetic location

for example:
```javascript

import {AstrologyService, AspectService, 
    EphemerisJSONRepository, OrbJSONRepository, 
    TrigonometricUtilities,HouseSystemFactory,
    TimeConversions, WorldTimezoneRepository, 
    ZodiacFactory, GeodeticLocation, HouseSystemType} from '@goldenius/hades-js';
import * as moment from 'moment-timezone';


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

let location = new GeodeticLocation('58w27','34s36');
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