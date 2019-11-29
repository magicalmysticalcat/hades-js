
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

const {Astrologer} = require('../distribution/index.js');
var moment = require('moment-timezone');

let astrologer = new Astrologer();
await astrologer.Init();
let planets = astrologer.CalculateCelestialBodiesAndTime(moment(),"GB",{latitude:33,longitude:55});
console.log(JSON.stringify(planets));


```