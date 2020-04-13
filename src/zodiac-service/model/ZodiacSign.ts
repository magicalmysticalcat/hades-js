class ZodiacSign 
{
    Name: string;
    StartsAt: number;
    EndsAt: number;
    Id: number;
    Symbol: string;
    Element: string;
    Mode: string;
    Rulers: any[];
    constructor(name: string, degreeStart: number,degreeEnd: number, id: number)
    {
        this.Name = name;
        this.StartsAt = degreeStart;
        this.EndsAt = degreeEnd;
        this.Id = id;
        this.Symbol = '';
        this.Element = '';
        this.Mode = '';
        this.Rulers = [];
    }
}
export default ZodiacSign;