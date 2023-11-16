export class Ship {

  id?: string = '00000000-0000-0000-0000-000000000000';
  className?: string = '';
  nation?: string = '';
  classType?: string = '';
  lengthFt?: number = 0;
  beamFt?: number = 0;
  standardWeight?: number = 0;
  fullWeight?: number = 0;
  launched?: number = 0;
  lastYearBuilt?: number = 0;
  numberInClass?: number = 0;

  guns?: number = 0;
  gunDiameter?: number = 0;
  armor?: number = 0;

  rudders?: number = 0;
  rudderType?: string = '';
  rudderStyle?: string = '';
  shafts?: number = 0;

  speedKnots?: number = 0;

  speedIrcwcc?: number = 0;
  shipClass?: number = 0;
  units?: number = 0;
  shiplistKey?: number = 0;

  comment?: string = '';
  wikiLink?: string = '';
  notes?: string = '';
}
