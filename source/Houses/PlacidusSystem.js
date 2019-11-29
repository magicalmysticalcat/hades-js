import HouseSystem from './HouseSystem';

class PlacidusSystem extends HouseSystem
{
    Create(eventDate,latitude)
    {
        let e = 23.456389;
        let i;
        let cuspPositions = new Array(13); 

        let ASC,MC,RA;
        RA = this.GetRAMCFromSeconds(eventDate);
        MC = this.CuspMidheaven(RA);
        ASC = this.CuspAscendant(RA, latitude,MC);

        cuspPositions[1] = this.MathCalcs.MOD(ASC);
        cuspPositions[4] = this.MathCalcs.MOD(MC)+180;
        cuspPositions[5] = this.GetCusp(30.0, 3.0, false,RA,latitude,e) + 180.0;
        cuspPositions[6] = this.GetCusp(60.0, 1.5, false,RA,latitude,e) + 180.0;
        cuspPositions[2] = this.GetCusp(120.0, 1.5, true,RA,latitude,e);
        cuspPositions[3] = this.GetCusp(150.0, 3.0, true,RA,latitude,e);
        for (i = 1; i <= 12; i++)
        {
            if (i <= 6)
            cuspPositions[i] = this.MathCalcs.MOD(cuspPositions[i]);
            else
            cuspPositions[i] = this.MathCalcs.MOD(cuspPositions[i - 6] + 180.0);
        }
        return cuspPositions;
    }

    GetCusp(deg, FF, fNeg,RAMC, lat, e)
    {
        let LO, R1, XS, X;
        let i;
        e = this.MathCalcs.RFromD(e);
        RAMC = this.MathCalcs.RFromD(RAMC);
        R1 = this.MathCalcs.RFromD(RAMC + deg);
        lat = this.MathCalcs.RFromD(lat);

        X = fNeg ? 1.0 : -1.0;
        /* Looping 10 times is arbitrary, but it's what other programs do. */
        for (i = 1; i <= 10; i++)
        {
            /* This formula works except at 0 latitude (AA == 0.0). */
            XS = X * this.MathCalcs.RSin(R1) * this.MathCalcs.RTan(e) * this.MathCalcs.RTan(lat == 0.0 ? 0.0001 : lat);
            XS = this.MathCalcs.RAcos(XS);
            if (XS < 0.0)
                XS += this.MathCalcs.rPi;
            R1 = RAMC + (fNeg ? this.MathCalcs.rPi - (XS / FF) : (XS / FF));
        }
        LO = this.MathCalcs.RAtn(this.MathCalcs.RTan(R1) / this.MathCalcs.RCos(e));
        if (LO < 0.0)
            LO += this.MathCalcs.rPi;
        if (this.MathCalcs.RSin(R1) < 0.0)
            LO += this.MathCalcs.rPi;
        return this.MathCalcs.MOD(this.MathCalcs.DFromR(LO));
    }
}
export default PlacidusSystem;