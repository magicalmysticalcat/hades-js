export interface IOrbRepository{
    GetOrbValue(celestialBodyName:string, orbName:string):number;
}