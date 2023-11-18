import { Component } from '@angular/core';
import { ProposedShipService } from '../Services/proposed-ships.service';
import { Ship } from "../Data/Ship";
import { map } from 'rxjs';
import { IrcwccService } from '../Services/ircwcc.service';

@Component({
  selector: 'app-proposed-ships',
  templateUrl: './proposed-ships.component.html',
  styleUrls: ['./proposed-ships.component.scss']
})
export class ProposedShipsComponent {
  columns: string[] = [
    "",
    "Ship Class",
    "Nationality",
    "Date Created"
  ];

  errorMessage: string = '';
  warships: IProposedShipViewModel[] = []

  constructor(private proposedShipAPI: ProposedShipService, private ircwccApi: IrcwccService) { }

  ngOnInit() {
    this.refreshShipList();
  }

  refreshShipList() {
    this.proposedShipAPI.getAllShips()
      .pipe(
        map((ships: Ship[]) => {
          return ships.map(ship => ({
            id: ship.id,
            className: ship.className,
            nation: ship.nation
          } as IProposedShipViewModel))
        }))
      .subscribe({
        next: ships => {
          this.warships = ships
        },
        error: err => this.errorMessage = err
      });
  }

  onDeleteShip() {
    var deletedShips = this.warships.filter(s => s.isChecked);

    var ids = deletedShips.map(s => s.id);

    this.proposedShipAPI.deleteShips(ids)
      .subscribe({
        next: ships => {
          this.refreshShipList();
        },
        error: err => this.errorMessage = err
      });
  }

  importIrcwccShipList() {
    this.ircwccApi.importShipList()
      .subscribe({
        next: success => {
          this.refreshShipList();
        },
        error: err => this.errorMessage = err
      });
  }
}

export interface IProposedShipViewModel {
  id: string
  className: string;
  nation: string;
  isChecked: boolean
}
