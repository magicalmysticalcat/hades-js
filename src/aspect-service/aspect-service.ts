import CelestialBody from "../models/CelestialBody";
import { IOrbRepository } from "./orb-repository.interface";
import Aspects from './resources/aspects.json';
import { AnalyzedRelationship } from "./model/AnalyzedRelationship";
import { IAspectService } from "./aspect-service.interface";

export class AspectService implements IAspectService{

	private _aspects = Aspects as any;

	constructor(private orbRepository:IOrbRepository){}
	
	public CalculateAspects(celestialBodies : CelestialBody[]) : any[] {
		let allAspects = [];
		let analizedPlanetsRelationships = [];
		for (let i = 0; i < celestialBodies.length; i++) {
			for (let j = 0; j < celestialBodies.length; j++) {
				if (j == i || this.IsPlanetRelationshipAnalized(celestialBodies[i], celestialBodies[j], analizedPlanetsRelationships))
					continue;

				var aspects = this.GetAspects(celestialBodies[i], celestialBodies[j]);
				if (aspects != undefined && aspects.length > 0) {
					analizedPlanetsRelationships.push(new AnalyzedRelationship(celestialBodies[i].Name, celestialBodies[j].Name));
					allAspects.push(aspects);
				}
			}
		}
		let flattenedArray = this.FlattenDeep(allAspects);
		return flattenedArray;
	}

	private IsPlanetRelationshipAnalized(celestialBody1:CelestialBody, 
								celestialBody2:CelestialBody, 
								analisedPlanetRelArray: AnalyzedRelationship[]) {
		analisedPlanetRelArray.forEach(rel => {
			if ((rel.celestialBody1 == celestialBody1.Name || rel.celestialBody1 == celestialBody2.Name) &&
				(rel.celestialBody2 == celestialBody1.Name || rel.celestialBody2 == celestialBody2.Name)) {
				return true;
			}
		});
	}

	private FlattenDeep(arr1:any[]):any[] {
		return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.FlattenDeep(val)) : acc.concat(val), []);
	}

	private GetAspects(celestialBody1:CelestialBody, celestialBody2:CelestialBody) {
		let distance = celestialBody1.TotalDegree > celestialBody2.TotalDegree ? 
							celestialBody1.TotalDegree - celestialBody2.TotalDegree : 
							celestialBody2.TotalDegree - celestialBody1.TotalDegree;
		let aspects = [];
		for(let aspectName in this._aspects){
			let aspectValue = this._aspects[aspectName];
			let isAspected = this.IsAspected(distance, celestialBody1, aspectName, aspectValue);
			if(isAspected)
			{
				aspects.push({
					type: aspectName,
					fromDeg: celestialBody1.TotalDegree,
					toDeg: celestialBody2.TotalDegree,
					celestialBodies: [celestialBody1, celestialBody2]
				});
			}
		}

		return aspects;
	}

	private IsAspected(distance:number, 
				celestialBody:CelestialBody, 
				aspectName:string,
				aspectValue:number):boolean
	{
		let orb = this.orbRepository.GetOrbValue(celestialBody.Name,aspectName)
		let aspectRule = aspectValue;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}
}


