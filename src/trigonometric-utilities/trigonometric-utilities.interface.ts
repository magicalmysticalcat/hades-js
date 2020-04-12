export interface ITrigonometricUtilities {
    RFromD(r:number):number;
    DFromR(r:number):number;
    Deg2Rad(r:number):number;
    Rad2Deg(r:number):number;
    RSin(r:number):number;
    RCos(r:number):number;
    RTan(r:number):number;
    RAtn(r:number):number;
    RAsin(r:number):number;
    RAcos(r:number):number;
    RSinD(r:number):number;
    RCosD(r:number):number;
    RTanD(r:number):number;
    NSinD(nR:number, nD:number):number;
    NCosD(nR:number, nD:number):number;
    MOD(d:number):number;
}