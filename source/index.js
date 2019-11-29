const Astrologer = require('./Astrologer');
const TimeConversions = require('./TimeConversions');
const ZodiacFactory = require('./Zodiac/ZodiacFactory');
const MathCalcs = require('./MathCalcs');
const CountriesAndTimezones = require('./CountriesAndTimezones');

module.exports = {
    Astrologer : Astrologer.default, 
    TimeConversions: TimeConversions.default,
    CreateZodiacSign: ZodiacFactory.CreateZodiacSign,
    MathCalcs: MathCalcs.default,
    CountriesAndTimezones: CountriesAndTimezones.default
};