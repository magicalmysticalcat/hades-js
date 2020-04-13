export class CelestialBody 
{
    public Id: string;
    public Name: string;
    public TotalDegree: number;
    public IsRetrograde: boolean;

    constructor(totalDegree: number, name: string)
    {
        this.TotalDegree = totalDegree;
        this.Name = name;
        this.IsRetrograde = false;
    }
}