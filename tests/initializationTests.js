
const {Astrologer, TimeConversions} = require('../distribution/index.js');
var moment = require('moment-timezone');

test();

async function test ()
{
    let astrologer = new Astrologer();
    await astrologer.Init();
    let planets = astrologer.CalculateCelestialBodiesAndTime(moment(),"GB",{latitude:33,longitude:55});
    console.log(JSON.stringify(planets));
}
