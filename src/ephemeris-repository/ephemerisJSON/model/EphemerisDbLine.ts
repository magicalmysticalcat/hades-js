export class EphemerisDbLine
{
    constructor(order:number, columns: string []){
        this.Order = order;
        this.Columns = columns;
    }
    Columns: string [];
    Order: number;
}