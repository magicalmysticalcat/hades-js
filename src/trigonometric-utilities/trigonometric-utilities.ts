import { ITrigonometricUtilities } from "./trigonometric-utilities.interface";

export class TrigonometricUtilities implements ITrigonometricUtilities{

    public get Pi():number {return Math.PI};
    public get e():number {return 23.456389};
    public get Pi2():number {return this.Pi*2.0};
    public get PiHalf():number {return this.Pi/2.0};
    public get DegreeMax():number {return 360.0};
    public get DegreeHalf():number {return 180.0};
    public get DegreeQuarter():number {return 90};
    public get Radian():number{return this.DegreeHalf/this.Pi};

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
