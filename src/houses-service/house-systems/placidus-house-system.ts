import HouseSystem from './house-system';
import moment from 'moment';
import { ITrigonometricUtilities } from '../../trigonometric-utilities/trigonometric-utilities.interface';

export class PlacidusHouseSystem extends HouseSystem
{
    constructor(trigonometricUtilities: ITrigonometricUtilities){
        super(trigonometricUtilities);
    }

    public Create(eventDate:moment.Moment,latitude:number):any[]
    {
        let e = 23.456389;
        let i;
        let cuspPositions = new Array(13); 

        let ASC,MC,RA;
        RA = this.GetRAMCFromSeconds(eventDate);
        MC = this.CuspMidheaven(RA);
        ASC = this.CuspAscendant(RA, latitude,MC);

        cuspPositions[1] = this._trigonometricUtilities.MOD(ASC);
        cuspPositions[4] = this._trigonometricUtilities.MOD(MC)+180;
        cuspPositions[5] = this.GetCusp(30.0, 3.0, false,RA,latitude,e) + 180.0;
        cuspPositions[6] = this.GetCusp(60.0, 1.5, false,RA,latitude,e) + 180.0;
        cuspPositions[2] = this.GetCusp(120.0, 1.5, true,RA,latitude,e);
        cuspPositions[3] = this.GetCusp(150.0, 3.0, true,RA,latitude,e);
        for (i = 1; i <= 12; i++)
        {
            if (i <= 6)
            cuspPositions[i] = this._trigonometricUtilities.MOD(cuspPositions[i]);
            else
            cuspPositions[i] = this._trigonometricUtilities.MOD(cuspPositions[i - 6] + 180.0);
        }
        return cuspPositions;
    }

    GetCusp(deg, FF, fNeg,RAMC, lat, e)
    {
        let LO, R1, XS, X;
        let i;
        e = this._trigonometricUtilities.RFromD(e);
        RAMC = this._trigonometricUtilities.RFromD(RAMC);
        R1 = this._trigonometricUtilities.RFromD(RAMC + deg);
        lat = this._trigonometricUtilities.RFromD(lat);

        X = fNeg ? 1.0 : -1.0;
        /* Looping 10 times is arbitrary, but it's what other programs do. */
        for (i = 1; i <= 10; i++)
        {
            /* This formula works except at 0 latitude (AA == 0.0). */
            XS = X * this._trigonometricUtilities.RSin(R1) * 
                        this._trigonometricUtilities.RTan(e) 
                        * this._trigonometricUtilities.RTan(lat == 0.0 ? 0.0001 : lat);

            XS = this._trigonometricUtilities.RAcos(XS);
            if (XS < 0.0)
                XS += this._trigonometricUtilities.Pi;
            R1 = RAMC + (fNeg ? this._trigonometricUtilities.Pi - (XS / FF) : (XS / FF));
        }
        LO = this._trigonometricUtilities.RAtn(this._trigonometricUtilities.RTan(R1) / this._trigonometricUtilities.RCos(e));
        if (LO < 0.0)
            LO += this._trigonometricUtilities.Pi;
        if (this._trigonometricUtilities.RSin(R1) < 0.0)
            LO += this._trigonometricUtilities.Pi;
        return this._trigonometricUtilities.MOD(this._trigonometricUtilities.DFromR(LO));
    }
}