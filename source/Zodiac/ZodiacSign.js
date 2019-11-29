class ZodiacSign 
{
    constructor(name, degreeStart,degreeEnd, id)
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