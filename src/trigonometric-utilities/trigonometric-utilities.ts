import { ITrigonometricUtilities } from "./trigonometric-utilities.interface";

export class TrigonometricUtilities implements ITrigonometricUtilities{

    public Pi:number=Math.PI;
    public e:number=23.456389;
    public Pi2:number = this.Pi*2.0;
    public PiHalf:number = this.Pi/2.0;
    public DegreeMax:number= 360.0;
    public DegreeHalf:number= 180.0;
    public DegreeQuarter:number= 90;
    public Radian:number=this.DegreeHalf/this.Pi;

    constructor() {}

    public RFromD(r:number):number { return ((r) / this.Radian); }
    public DFromR(r:number):number { return ((r) * this.Radian); }
    public Deg2Rad(r:number):number { return ((r) / this.Radian); }
    public Rad2Deg(r:number):number { return ((r) * this.Radian); }
    public RSin(r:number):number { return Math.sin(r); }
    public RCos(r:number):number { return Math.cos(r); }
    public RTan(r:number):number { return Math.tan(r); }
    public RAtn(r:number):number { return Math.atan(r); }
    public RAsin(r:number):number { return Math.asin(r); }
    public RAcos(r:number):number { return Math.acos(r); }
    public RSinD(r:number):number { return this.RSin(this.RFromD(r)); }
    public RCosD(r:number):number { return this.RCos(this.RFromD(r)); }
    public RTanD(r:number):number { return this.RTan(this.RFromD(r)); }
    public NSinD(nR:number, nD:number):number { return (nR * this.RSinD(nD)); }
    public NCosD(nR:number, nD:number):number { return (nR * this.RCosD(nD)); }
    
    public MOD(d:number):number {
        if (d >= 360.0)
            d -= 360.0;
        else if (d < 0.0)
            d += 360.0;
        if (d >= 0 && d < 360.0)
            return d;
        return (d - Math.floor(d / 360.0) * 360.0);
    }
}
