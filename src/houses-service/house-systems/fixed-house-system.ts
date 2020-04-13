import HouseSystem from './house-system';
import {ITrigonometricUtilities} from '../../trigonometric-utilities/trigonometric-utilities.interface';
import moment from 'moment';

export class FixedHouseSystem extends HouseSystem
{
    constructor(trigonometricUtilities: ITrigonometricUtilities){
        super(trigonometricUtilities);
    }
    
    public Create(eventDate:moment.Moment,latitude)
    {
        let e = 23.456389;
        let i;
        let cuspPositions = new Array(13); 

        let ASC,MC,RA;
        RA = this.GetRAMCFromSeconds(eventDate);
        MC = this.CuspMidheaven(RA);
        ASC = this.CuspAscendant(RA, latitude,MC);

        cuspPositions[1] = this._trigonometricUtilities.MOD(ASC);
        for (i = 2; i <= 12; i++)
            cuspPositions[i] = cuspPositions[i-1]+30;
        return cuspPositions;
    }
}