import { Component } from '@angular/core';
import { Ship } from "src/app/Data/Ship";
import { ActivatedRoute } from '@angular/router';
import { ProposedShipService } from '../../Services/proposed-ships.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WikiService } from '../../Services/wiki.service';
import { IrcwccService } from '../../Services/ircwcc.service';
import { NationalityService } from '../../Services/nationality.service';
import { Nationality } from '../../Data/Nationality';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit-proposed-ships',
  templateUrl: './edit-proposed-ships.component.html',
  styleUrls: ['./edit-proposed-ships.component.scss']
})
export class EditProposedShipsComponent {
  shipForm: FormGroup = this.fb.group({});

  nations?: Observable<Nationality[]>
  wikiShip?: Ship
  ircwccShip?: Ship
  errorMessage: string = '';

  shipProperties: FieldMap[] = [
    new FieldMap("className", "Class Name"),
    new FieldMap("nation", "Nationality", "", "form-select", this.nationalityApi.getAllNations()),
    new FieldMap("classType", "Class Type", "", "form-select"),
    new FieldMap("lengthFt", "Length", "Feet"),
    new FieldMap("beamFt", "Beam", "Feet"),
    new FieldMap("standardWeight", "Standard Weight", "Tons"),
    new FieldMap("fullWeight", "Full Weight", "Tons"),
    new FieldMap("launched", "Launched"),
    new FieldMap("lastYearBuilt", "Completed"),
    new FieldMap("numberInClass", "Number of ships"),
    new FieldMap("rudders", "Rudders"),
    new FieldMap("rudderType", "Rudder Type"),
    new FieldMap("rudderStyle", "Rudder Style"),
    new FieldMap("shafts", "Shafts"),
    new FieldMap("speedKnots", "Speed", "Knots"),
    new FieldMap("speedIrcwcc", "IRCWCC Speed", "sec./100'"),
    new FieldMap("guns", "Number of Primary Guns"),
    new FieldMap("gunDiameter", "Primary Gun Diameter", "inches"),
    new FieldMap("armor", "Belt Armor", "inches"),
    new FieldMap("shipClass", "IRCWCC Ship Class"),
    new FieldMap("units", "IRCWCC Units"),
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private proposedShipAPI: ProposedShipService,
    private wikiAPI: WikiService, private ircwccAPI: IrcwccService, private nationalityApi: NationalityService) {

    this.showShip(new Ship());

    this.route.paramMap.subscribe(
      params => {
        var shipId = params.get('id');
        if (shipId) {
          this.proposedShipAPI.getShip(shipId).subscribe({
            next: shipWorkSheet => {
              this.showShip(shipWorkSheet.proposedShip!);
              this.wikiShip = shipWorkSheet.wikiShip;
              this.ircwccShip = shipWorkSheet.ircwccShip;
            },
            error: err => this.errorMessage = err
          });
        }
      }
    );
  }

  private showShip(ship: Ship) {
    this.shipForm = this.fb.group(ship);
  }

  onShipListKeyImport() {
    var url = this.shipForm.controls['shiplistKey']?.value;

    this.ircwccAPI.getShip(url).subscribe({
      next: ship => {
        //this.showShip(ship);
        this.ircwccShip = ship;
      }
    });
  }

  onWikiImport() {
    var url = this.shipForm.controls['wikiLink']?.value;

    this.wikiAPI.getShip(url).subscribe({
      next: ship => {
        //this.showShip(ship);
        this.wikiShip = ship;
      }
    });
  }

  onSave() {
    let ship: Ship = this.shipForm.value

    this.proposedShipAPI.saveShip(ship).subscribe({
      next: ships => {
        //this.warships = ships
      },
      error: err => this.errorMessage = err
    });
  }

  changeValue(source: any, field?: string) {
    this.shipForm.controls[field!].setValue(source?.[field!]);
  }

  getValue(source: any, field?: string): string {
    return source?.[field!];
  }

  showValue(source: any, altSource: any, field?: string): boolean {
    if (source?.[field!] == null)
      return false;

    if (source?.[field!] == this.shipForm.controls[field!].value)
      return false;

    if (source?.[field!] == altSource?.[field!])
      return false;

    return true;
  }
}

export class FieldMap {
  field: string;
  display: string;
  units?: string;
  controlType: string;
  options?: Observable<IOption[]>;

  constructor(field: string, display: string, units?: string, controlType: string = "form-control", options?: Observable<IOption[]>) {
    this.field = field;
    this.display = display;
    this.units = units;
    this.controlType = controlType;
    this.options = options;
  }
}

export interface IOption
{
  value?: string;
  display?: string;
}
