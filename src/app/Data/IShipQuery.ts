
export interface IShipQuery
{
    nation? : string;
    className? : string;
    
    minUnits? : number;
    maxUnits?  : number;

    minSpeedIrcwcc?  : number;
    maxSpeedIrcwcc? : number;

    minSpeedKnots?  : number;
    maxSpeedKnots?  : number;

    minLength?  : number;
    maxLength?  : number;

    minBeam?  : number;
    maxBeam?  : number;

    skip? : number;
    take? : number;
}
