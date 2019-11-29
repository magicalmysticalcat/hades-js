
class AspectCalculator {
	CalculateAspects(planets) {
		let allAspects = [];
		let analizedPlanetsRelationships = [];
		for (let i = 0; i < planets.length; i++) {
			for (let j = 0; j < planets.length; j++) {
				if (j == i || this.IsPlanetRelationshipAnalized(planets[i], planets[j], analizedPlanetsRelationships))
					continue;

				var aspects = this.GetAspects(planets[i], planets[j]);
				if (aspects != undefined && aspects.length > 0) {
					analizedPlanetsRelationships.push({planet1: planets[i].name, planet2: planets[j].name});
					allAspects.push(aspects);
				}
			}
		}
		let flattenedArray = this.FlattenDeep(allAspects);
		return flattenedArray;
	}

	IsPlanetRelationshipAnalized(planet1, planet2, analisedPlanetRelArray) {
		analisedPlanetRelArray.forEach(rel => {
			if ((rel.planet1 == planet1.name || rel.planet1 == planet2.name) &&
				(rel.planet2 == planet1.name || rel.planet2 == planet2.name)) {
				return true;
			}
		});
	}

	FlattenDeep(arr1) {
		return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.FlattenDeep(val)) : acc.concat(val), []);
	}

	GetAspects(planet1, planet2) {
		let distance = planet1.TotalDegree > planet2.TotalDegree ? planet1.TotalDegree - planet2.TotalDegree : planet2.TotalDegree - planet1.TotalDegree;
		let aspects = [];
		if (this.IsConjunction(distance, planet1))
			aspects.push({
				type: 'conjunction',
				fromDeg: planet1.TotalDegree,
				toDeg: planet2.TotalDegree,
				planets: [planet1, planet2]
			});
		if (this.IsOpposition(distance, planet1))
			aspects.push({
				type: 'opposition',
				fromDeg: planet1.TotalDegree,
				toDeg: planet2.TotalDegree,
				planets: [planet1, planet2]
			});
		if (this.IsSquare(distance, planet1))
			aspects.push({
				type: 'square',
				fromDeg: planet1.TotalDegree,
				toDeg: planet2.TotalDegree,
				planets: [planet1, planet2]
			});
		if (this.IsTrine(distance, planet1))
			aspects.push({
				type: 'trine',
				fromDeg: planet1.TotalDegree,
				toDeg: planet2.TotalDegree,
				planets: [planet1, planet2]
			});
		if (this.IsSextile(distance, planet1))
			aspects.push({
				type: 'sextile',
				fromDeg: planet1.TotalDegree,
				toDeg: planet2.TotalDegree,
				planets: [planet1, planet2]
			});

		return aspects;
	}

	IsConjunction(distance, planet) {
		let orb = planet.Orbs.Conjunction;
		let aspectRule = 0;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}

	IsOpposition(distance, planet) {
		let orb = planet.Orbs.Opposition;
		let aspectRule = 180;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}

	IsSquare(distance, planet) {
		let orb = planet.Orbs.Square;
		let aspectRule = 90;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}

	IsTrine(distance, planet) {
		let orb = planet.Orbs.Trine;
		let aspectRule = 120;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}

	IsSextile(distance, planet) {
		let orb = planet.Orbs.Sextile;
		let aspectRule = 60;
		let aspectPlusOrb = aspectRule + orb;
		let aspectLessOrb = aspectRule - orb;
		if (distance >= aspectLessOrb && distance <= aspectPlusOrb)
			return true;
		else
			return false;
	}
}

export default AspectCalculator;
