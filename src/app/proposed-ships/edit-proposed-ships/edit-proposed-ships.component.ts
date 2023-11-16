import { Component } from '@angular/core';
import { Ship } from "src/app/Data/Ship";
import { ActivatedRoute } from '@angular/router';
import { ProposedShipService } from '../../Services/proposed-ships.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WikiService } from '../../Services/wiki.service';
import { IrcwccService } from '../../Services/ircwcc.service';

@Component({
  selector: 'app-edit-proposed-ships',
  templateUrl: './edit-proposed-ships.component.html',
  styleUrls: ['./edit-proposed-ships.component.scss']
})
export class EditProposedShipsComponent {
  shipForm: FormGroup = this.fb.group({});

  wikiShip?: Ship
  ircwccShip?: Ship
  errorMessage: string = '';

  shipProperties: FieldMap[] = [
    //{ field: "className", display: "Class Name" },
    //{ field: "nation", display: "Nationality" },
    //{ field: "classType", display: "Class Type", controlType:"form-select" },
    //{ field: "length", display: "Length", units: "Feet" },
    //{ field: "beam", display: "Beam", units: "Feet" },
    { field: "standardWeight", display: "Standard Weight", units: "Tons" },
    //{ field: "fullWeight", display: "Full Weight", units: "Tons" },
    //{ field: "launched", display: "Launched" },
    //{ field: "lastYearBuilt", display: "Completed" },
    //{ field: "numberInClass", display: "Number of ships" },
    //{ field: "rudders", display: "Rudders" },
    //{ field: "rudderType", display: "Rudder Type" },
    //{ field: "rudderStyle", display: "Rudder Style" },
    //{ field: "shafts", display: "Shafts" },
    //{ field: "speedKnots", display: "Speed", units: "Knots" },
    //{ field: "speedIrcwcc", display: "IRCWCC Speed", units: "sec./100'" },
    //{ field: "guns", display: "Number of Primary Guns" },
    //{ field: "gunDiameter", display: "Primary Gun Diameter", units: "inches" },
    //{ field: "armor", display: "Belt Armor", units: "inches" },
    //{ field: "shipClass", display: "IRCWCC Ship Class" },
    //{ field: "units", display: "IRCWCC Units" },
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private proposedShipAPI: ProposedShipService,
    private wikiAPI: WikiService, private ircwccAPI: IrcwccService) {
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

    if (source?.[field!] != this.shipForm.controls[field!].value)
      return true;

    if (source?.[field!] == altSource?.[field!])
      return false;

    return true;
  }
}

export class FieldMap {
  field?: string;
  display?: string;
  units?: string;
  controlType?: string = "form-control";
}
