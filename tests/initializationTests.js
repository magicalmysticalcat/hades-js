
const {Astrologer, TimeConversions} = require('../distribution/index.js');
var moment = require('moment-timezone');

testPlanetCalculation();
testTimeConversion();

async function testPlanetCalculation ()
{
    let astrologer = new Astrologer();
    await astrologer.Init();
    let planets = astrologer.CalculateCelestialBodiesAndTime(moment(),"GB",{latitude:33,longitude:55});
    console.log(JSON.stringify(planets));
}

function testTimeConversion()
{
    let timeConversions = new TimeConversions();
    let result = timeConversions.ConvertDecimalDegreesToHMS(21.8);
    console.log(JSON.stringify(result));
}