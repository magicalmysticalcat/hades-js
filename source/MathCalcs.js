class MathCalcs
{
    constructor()
    {
        this.rPi = Math.PI;
        this.e = 23.456389;
        this.rPi2 =  (this.rPi * 2.0);
        this.rPiHalf = (this.rPi / 2.0);
        this.rDegMax = 360.0;
        this.rDegHalf = 180.0;
        this.rDegQuad = 90.0;
        this.rDegRad = (this.rDegHalf / this.rPi);
    }

    RFromD(r) {return ((r) / this.rDegRad);}
    DFromR(r) {return ((r) * this.rDegRad);}
    Deg2Rad(r) {return ((r) / this.rDegRad);}
    Rad2Deg(r) {return ((r) * this.rDegRad);}
    RSin(r) { return Math.sin(r) }
    RCos(r) {return Math.cos(r)}
    RTan(r) {return Math.tan(r)}
    RAtn(r) {return Math.atan(r)}
    RAsin(r) {return Math.asin(r)}
    RAcos(r) {return Math.acos(r)}
    RSinD(r) {return this.RSin(this.RFromD(r))}
    RCosD(r) {return this.RCos(this.RFromD(r))}
    RTanD(r) {return this.RTan(this.RFromD(r))}
    NSinD(nR, nD) {return(nR*this.RSinD(nD))}
    NCosD(nR, nD) {return (nR*this.RCosD(nD))}



    MOD(d) {
        if (d >= 360.0)			
            d -= 360.0;			
        else if (d < 0.0)		
            d += 360.0;
    
        if (d >= 0 && d < 360.0)
            return d;
        return (d - Math.floor(d / 360.0) * 360.0);
    }
}

export default MathCalcs;