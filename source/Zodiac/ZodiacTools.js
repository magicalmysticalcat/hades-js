class ZodiacTools
{
    static GetRelativeZodiacDegree(degree)
    {
        while(degree>=30)
            degree -= 30;
        return degree;
    }
}
export default ZodiacTools;