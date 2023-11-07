export interface IShip {

  id: string;
  nation: string;
  className: string;
  classType: string;
  units: number;
  numberInClass: number;
  speedIrcwcc: number;
  speedKnots: number;
  length: number;
  beam: number;
  standardWeight: number;
  fullWeight: number;
  guns: number;
  gunDiameter: number;
  armor: number;
  rudders: number;
  rudderType: string;
  rudderStyle: string;
  shafts: number;

  launched: number;
  completed: number;

  comment: string;
  wikiLink: string;

  notes: string;
}
