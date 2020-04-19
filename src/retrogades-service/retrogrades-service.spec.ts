import {RetrogradesService} from './retrogades-service';

describe("RetrogradesService", () => {

    let retrogradesService: RetrogradesService;
    retrogradesService = new RetrogradesService();

    it("should be retrograde", () => {
        let previousPosition = 279.2;
        let currentPosition = 279.1;
        let result = retrogradesService.IsRetrograde(previousPosition, currentPosition);
        expect(result).toBeTrue();
    });

    it("should not be retrograde", () => {
        let previousPosition = 279.1;
        let currentPosition = 279.2;
        let result = retrogradesService.IsRetrograde(previousPosition, currentPosition);
        expect(result).toBeFalse();
    });

});