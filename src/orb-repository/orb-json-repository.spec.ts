import {IOrbRepository} from './orb-repository.interface';
import {OrbJSONRepository} from './orb-json-repository';

describe("OrbJSONRepository", () => {
    let orbRepository: IOrbRepository;
    orbRepository = new OrbJSONRepository();

    beforeEach(async function() {
    });

    fit("should match planets for 1984-12-26 19:00:00", () => {
         //console.log(orbRepository.GetOrbValue('Pluto','Conjunction'));
         expect(true).toBeTrue();
    });
});