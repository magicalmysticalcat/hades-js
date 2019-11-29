import HouseSystem from './HouseSystem';

class FixedSystem extends HouseSystem
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
        for (i = 2; i <= 12; i++)
            cuspPositions[i] = cuspPositions[i-1]+30;
        return cuspPositions;
    }
}
export default FixedSystem;