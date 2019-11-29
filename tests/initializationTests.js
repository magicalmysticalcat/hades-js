
var hadesJs = require('../distribution/index.js');
var moment = require('moment-timezone');

test();

async function test ()
{
    await hadesJs.Init();
    let planets = hadesJs.CalculateCelestialBodiesAndTime(moment(),"GB",{latitude:33,longitude:55});
    console.log(JSON.stringify(planets));
}
