const Astrologer = require('./Astrologer');
const TimeConversions = require('./TimeConversions');
const CreateZodiacSign = require('./Zodiac/ZodiacFactory');
const MathCalcs = require('./MathCalcs');
const CountriesAndTimezones = require('./CountriesAndTimezones');

module.exports = {
    Astrologer : Astrologer.default, 
    TimeConversions: TimeConversions.default,
    CreateZodiacSign: CreateZodiacSign.default,
    MathCalcs: MathCalcs.default,
    CountriesAndTimezones: CountriesAndTimezones.default
};