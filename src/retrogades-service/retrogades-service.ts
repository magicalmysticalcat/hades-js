import { IRetrogradesService } from "./retrogrades-service.interface";

export class RetrogradesService implements IRetrogradesService{
    IsRetrograde(previousPosition:number, currentPosition: number): boolean {
        return currentPosition<previousPosition;
    }
}