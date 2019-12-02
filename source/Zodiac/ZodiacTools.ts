class ZodiacTools
{
    static GetRelativeZodiacDegree(degree: number) : number
    {
        while(degree>=30)
            degree -= 30;
        return degree;
    }
}
export default ZodiacTools;