
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
let dateForNow = moment();
let celestialBodies = this.hadesJs.CalculateCelestialBodiesAndTime(dateForNow,"GB",{longitude:"-50",latitude:"20"});