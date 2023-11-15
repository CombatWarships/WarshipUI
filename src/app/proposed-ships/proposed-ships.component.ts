import { Component } from '@angular/core';
import { ProposedShipService } from '../Services/proposed-ships.service';
import { IShip } from '../Data/IShip';

@Component({
  selector: 'app-proposed-ships',
  templateUrl: './proposed-ships.component.html',
  styleUrls: ['./proposed-ships.component.scss']
})
export class ProposedShipsComponent {
  columns: string[] = [
    "Ship Class",
    "Nationality",
    "Date Created"
  ];

  errorMessage: string = '';
  warships: IShip[] = []

  constructor(private proposedShipAPI: ProposedShipService) { }

  ngOnInit(): void {
    this.proposedShipAPI.getAllShips().subscribe({
      next: ships => {
        this.warships = ships
      },
      error: err => this.errorMessage = err
    });
  }
}
