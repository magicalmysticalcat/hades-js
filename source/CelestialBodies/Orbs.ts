class Orbs
{
    Conjunction: number; 
    Opposition: number; 
    Square: number; 
    Trine: number; 
    Sextile: number; 
    constructor(conjunction:number, opposition: number, square: number, trine: number, sextile: number)
    {
        this.Conjunction = conjunction;
        this.Opposition = opposition;
        this.Square = square;
        this.Trine = trine;
        this.Sextile = sextile;
    }
}
export default Orbs;