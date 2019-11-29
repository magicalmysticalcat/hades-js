
# Hades-js

### Features

- Planetary positions from a geocentric point of view.
- Placidus and Fixed house systems.
- ASC, MC, Julian day and sidereal time.

####Install

`$ npm install @goldenius/hades-js`

####Usage
Before using this library, it's necessary to initialise it so it loads some needed resources:
```javascript
let hadesJs = require("@goldenius/hades-js")
await hadesJs.Init();
```

The easiest way to retrieve planetary positions with aspects and house calculations is to input:
- date and time (momentjs date object)
- timezone
- geodetic location

for example:
```javascript

var hadesJs = require('@goldenius/hades-js');
var moment = require('moment-timezone');

await hadesJs.Init();
let planets = hadesJs.CalculateCelestialBodiesAndTime(moment(),"GB",{latitude:33,longitude:55});
console.log(JSON.stringify(planets));

```