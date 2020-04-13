import { IOrbRepository } from "./orb-repository.interface";
import Orbs from './resources/orbs.json';

export class OrbJSONRepository implements IOrbRepository{
    
    private OrbRepository = Orbs as any;

    public GetOrbValue(celestialBodyName: string, orbName: string): number {
        return this.OrbRepository[celestialBodyName][orbName];
    }
    
}