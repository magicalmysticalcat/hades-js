import {RetrogradesService} from './retrogades-service';
import { EphemerisDbLineColumnIndex } from '../ephemeris-repository/ephemerisJSON/model/EphemerisDbLineColumnIndex';

describe("RetrogradesService", () => {

    let retrogradesService: RetrogradesService;
    retrogradesService = new RetrogradesService();

    it("should be retrograde with ingress time", () => {
        let retrogrades = "----xxxx--xxxx----xxxxxx--xx--xx----";
        let ingressTimes = "----05------------------------------";
        let planetIndex = EphemerisDbLineColumnIndex.Mercury;
        let timeOfEvent = 6;
        let result = retrogradesService.IsRetrograde(retrogrades,ingressTimes,planetIndex, timeOfEvent);
        expect(result).toBeTrue();
    });

    it("should not be retrograde with ingress time", () => {
        let retrogrades = "----xxxx--xxxx----xxxxxx--xx--xx----";
        let ingressTimes = "----05------------------------------";
        let planetIndex = EphemerisDbLineColumnIndex.Mercury;
        let timeOfEvent = 4;
        let result = retrogradesService.IsRetrograde(retrogrades,ingressTimes,planetIndex, timeOfEvent);
        expect(result).toBeFalse();
    });

    it("should be saturn retrograde with ingress time", () => {
        let retrogrades = "------------xx----xxxx----------xx--";
        let ingressTimes = "------------05----------------------";
        let planetIndex = EphemerisDbLineColumnIndex.Saturn;
        let timeOfEvent = 5;
        let result = retrogradesService.IsRetrograde(retrogrades,ingressTimes,planetIndex, timeOfEvent);
        expect(result).toBeTrue();
    });

});